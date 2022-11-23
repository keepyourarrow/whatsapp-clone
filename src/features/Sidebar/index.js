import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

import EditProfile from "./components/EditProfile/EditProfile";
import CreateRoom from "./components/CreateRoom";
import ChatRooms from "./components/ChatRooms";
import Searchbar from "./components/Searchbar";
import Header from "./components/Header";

import { handleMotionViewTransformStyle } from "utils/other";
import AnimationWrapper from "./components/AnimationWrapper";

const Sidebar = ({ setOpenRoomInfo }) => {
  useFirestoreConnect({ collection: "rooms", orderBy: ["createdAt", "desc"] });
  const rooms = useSelector((state) => state.firestore.ordered.rooms);
  const filteredRooms = useSelector((state) => state.rooms.filteredRooms);
  const activeRoom = useSelector((state) => state.activeRoom.activeRoom);
  const dispatch = useDispatch();

  const [sidebarView, setSidebarView] = useState("default");

  useEffect(() => {

    if (rooms) {
      dispatch({ type: "SET_FILTERED_ROOMS", payload: rooms });
    }
    // this is what makes it feel like you are chatting
    //as messages are updated immediately.
    if (activeRoom.id) {
      let room = rooms.find((r) => activeRoom.id === r.id);
      dispatch({ type: "SELECT_ACTIVE_ROOM", payload: room });
    }
  }, [rooms]);

  return (
    <div
      id="sidebar-container"
      className={
        "z-50 flex flex-col w-full max-w-sm h-full border-r border-gray-700 border-opacity-25 " +
        (sidebarView === "default" ? "bg-white" : "bg-gray-sidebar-body")
      }
    >
      <AnimateSharedLayout>
        <AnimatePresence exitBeforeEnter>
          {sidebarView === "default" && (
            <motion.div
              className="pb-28 overflow-hidden"
              initial={false}
              id="sidebar-default"
              transition={{ duration: 0 }}
              layout
              onLayoutAnimationComplete={(e) =>
                setTimeout(() => {
                  handleMotionViewTransformStyle("removeTransform");
                }, 300)
              }
            >
              <Header setSidebarView={setSidebarView} />
              <Searchbar
                defaultRooms={rooms}
              />
              <ChatRooms
                filteredRooms={filteredRooms}
                setOpenRoomInfo={setOpenRoomInfo}
              />
            </motion.div>
          )}

          {sidebarView === "createRoom" && (
            <AnimationWrapper
              id="createRoom"
            >
              <CreateRoom setSidebarView={setSidebarView} />
            </AnimationWrapper>
          )}

          {sidebarView === "edit-profile" && (
            <AnimationWrapper
              id="edit-profile"
            >
              <EditProfile setSidebarView={setSidebarView} />
            </AnimationWrapper>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
};

export default Sidebar;
