import React, { useState, useEffect } from "react";

import { EditProfile } from "./EditProfile/main";
import { CreateRoom } from "./CreateRoom/main";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { handleMotionViewTransformStyle } from "../reusable/functions/functions";
import { ChatRooms } from "./Default/ChatRooms";
import { Searchbar } from "./Default/Searchbar";
import { SidebarDefaultHeader } from "./Default/SidebarDefaultHeader/SidebarDefaultHeader";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

const Sidebar = ({ setOpenRoomInfo }) => {
  useFirestoreConnect({ collection: "rooms", orderBy: ["createdAt", "desc"] });
  const rooms = useSelector((state) => state.firestore.ordered.rooms);
  const [sidebarView, setSidebarView] = useState("default");
  const dispatch = useDispatch();
  const filteredRooms = useSelector((state) => state.rooms.filteredRooms);
  const activeRoom = useSelector((state) => state.activeRoom.activeRoom);

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
              id="motion-view"
              transition={{ duration: 0 }}
              layout
              onLayoutAnimationComplete={(e) =>
                setTimeout(() => {
                  handleMotionViewTransformStyle("removeTransform");
                }, 300)
              }
            >
              <SidebarDefaultHeader setSidebarView={setSidebarView} />
              <Searchbar
                defaultRooms={rooms}
                rooms={filteredRooms}
                dispatch={dispatch}
              />
              <ChatRooms
                filteredRooms={filteredRooms}
                dispatch={dispatch}
                setOpenRoomInfo={setOpenRoomInfo}
              />
            </motion.div>
          )}

          {sidebarView === "createRoom" && (
            <motion.div
              id="motion-view"
              key={sidebarView}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "tween",
                delayChildren: 1.5,
                velocity: 1,
                duration: 0.3,
              }}
            >
              <CreateRoom setSidebarView={setSidebarView} />
            </motion.div>
          )}
          {sidebarView === "edit-profile" && (
            <motion.div
              id="motion-view"
              key={sidebarView}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "tween",
                delayChildren: 1.5,
                velocity: 1,
                duration: 0.3,
              }}
            >
              <EditProfile setSidebarView={setSidebarView} />
            </motion.div>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
};

export default Sidebar;
