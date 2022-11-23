import React from 'react'
import { TrashSolid } from "@graywolfai/react-heroicons";

import { dateToFromNowDaily } from 'utils/time';
import { getSenderName, getTime } from '../utils';

const Message = ({ createdBy, currentUser, date, from, message, handleDelete }) => {
	return (
		<div>
			{from === "admin" && (
				<div className="mb-4 flex flex-col justify-center items-center space-y-4">
					<div className="py-1 px-3 bg-azure text-sm text-gray-800 rounded-lg shadow">
						{dateToFromNowDaily(date)}
					</div>
					<div className="py-1 px-3 bg-azure text-sm text-gray-800 rounded-lg shadow">
						{getSenderName(createdBy, currentUser)}
						{message}
					</div>
				</div>
			)}

			{from !== "admin" && (
				<div
					className={
						"px-1/11 w-auto flex space-x-1 " +
						(message.length > 60 ? "items-end" : "items-center")
					}
				>
					<div
						className={
							"relative inline-block mb-1 px-2 py-2  max-w-3/5 rounded-lg shadow whitespace-pre-line " +
							(from === currentUser
								? "bg-chat-box-user-message ml-auto"
								: "bg-white")
						}
					>
						<div>
							{from !== currentUser && (
								<div className="text-sm text-other-users-message-from leading-6 font-medium">
									{from}
								</div>
							)}
							<div className="flex items-end break-words">
								<div className="flex-1">
									<span className="text-black whitespace-normal">
										{message}
									</span>
								</div>
								<div className="ml-4 leading-3 text-right text-xs text-gray-600">
									<span>{getTime(date)}</span>
								</div>
							</div>
						</div>
					</div>
					{currentUser && currentUser === from && (
						<div className="flex justify-end">
							<button
								tabIndex="-1"
								type="button"
								className="text-red-500 hover:text-red-400 focus:outline-none"
								onClick={handleDelete}
							>
								<TrashSolid className="w-5 h-5" />
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Message