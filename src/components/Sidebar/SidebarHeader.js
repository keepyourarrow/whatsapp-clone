import React from "react";
import { ArrowLeftOutline } from "@graywolfai/react-heroicons";
import { motion } from "framer-motion";

import { handleMotionViewTransformStyle } from "utils/other";

const SidebarHeader = ({ title, setSidebarView }) => {

  const handleSidebarView = () => {
    handleMotionViewTransformStyle("addTransform");
    setSidebarView("default");
  };

  return (
    <header className="bg-green-header text-white">
      <motion.div
        className="px-6 pt-16 pb-4  space-x-8 flex items-end"
        initial={{ x: "-20px", opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <button
          className="focus:outline-none h-6 w-6"
          type="button"
          onClick={handleSidebarView}
        >
          <ArrowLeftOutline />
        </button>
        <span className="font-semibold text-xl leading-7">{title}</span>
      </motion.div>
    </header>
  );
};

export default SidebarHeader;