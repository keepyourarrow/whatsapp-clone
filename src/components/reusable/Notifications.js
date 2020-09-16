import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export const Notifications = ({ message, children }) => {
  const error = useSelector((state) => state.notifications.error);

  return (
    <motion.div
      className="py-3 px-4 fixed bottom-0 mx-5 my-4 z-50 bg-black bg-opacity-75 text-gray-200 text-center rounded-md shadow-md"
      key="notification"
      transition={{ duration: 0.2, ease: "easeOut" }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
    >
      <div className="flex items-center justify-between">
        <span className={error ? "text-red-500" : ""}>{message}</span>
        {children}
      </div>
    </motion.div>
  );
};
