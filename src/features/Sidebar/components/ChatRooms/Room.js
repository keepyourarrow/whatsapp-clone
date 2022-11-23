import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { TrashSolid } from "@graywolfai/react-heroicons";

import ModalNotification from 'components/ui/Modal/ModalNotification';

import { dateToFromNowDaily } from "utils/time";
import { getSenderName } from '../../utils';
import { deleteRoom } from "redux/actions/roomsActions";
import DefaultChatImage from '../../assets/DefaultChatImage';

const Room = ({ room, setOpenRoomInfo }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.firebase.profile.userName);

	const lastMessage = room.messages[room.messages.length - 1];

	const handleActiveRoom = (room) => {
    setOpenRoomInfo(false);
    dispatch({ type: "SET_ACTIVE", payload: room });
    dispatch({ type: "SELECT_ACTIVE_ROOM", payload: room });
  };

	const handleDelete = (e, room) => {
		e.stopPropagation();
		if (room.createdBy === currentUser) {
			dispatch({ type: "TOGGLE_MODAL", payload: {
				message: `Delete "${room.name}" room?`,
				modalComponent: <ModalNotification />,
				payload: room,
				firstBtn: "Cancel",
				secondBtn: "Delete",
				modalExitBtn: false,
				secondBtnAction: deleteRoom,
			}});
		} else {
			dispatch({ type: "TOGGLE_MODAL", payload: {
				message: "Only the one who created the room can delete it!",
				modalComponent: <ModalNotification />,
				firstBtn: "Ok",
				modalExitBtn: false
			}});
		}
	}

	return (
		<div
			role="button"
			className={
				"relative group flex items-center justify-between pl-4 py-2 cursor-pointer mb-1 hover:bg-gray-400 hover:bg-opacity-25 " +
				(room.active && "bg-gray-400 bg-opacity-25")
			}
			onClick={() => handleActiveRoom(room)}
		>
			<div className="flex space-x-4">
				<span>
					{room.photo ? (
						<img
							className="w-12 h-12 object-cover object-center rounded-full"
							src={room.photo}
							alt="room-avatar"
						/>
					) : (
						<DefaultChatImage />
					)}
				</span>
				<div>
					<div className="text-lg truncate max-w-xs-- text-gray-900 font-medium">
						{room.name}
					</div>
					<p className="text-gray-900 text-sm truncate max-w-xs--">
						{getSenderName(lastMessage.from, room.createdBy, currentUser)}
						{lastMessage.message}
					</p>
				</div>
			</div>
			<div className="px-4 text-sm text-gray-700 text-opacity-75">
				<div className="-mt-4">
					{dateToFromNowDaily(lastMessage.date)}
					{currentUser && (
						<div className="absolute mr-2 right-0 transform translate-x-12 transition duration-200 ease-out group-hover:translate-x-0">
							<button
								tabIndex="-1"
								type="button"
								className="text-red-500 hover:text-red-400 focus:outline-none"
								onClick={(e) => handleDelete(e, room)}
							>
								<TrashSolid className="w-5 h-5" />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Room