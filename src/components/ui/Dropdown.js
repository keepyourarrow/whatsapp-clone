import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const DropdownContent = ({ dropdownItems }) => {
  return (
    <motion.nav
      key={dropdownItems}
      className="absolute right-0 mt-2 z-30 py-2 bg-white shadow-dropdown-shadow rounded w-43"
      onClick={(e) => e.stopPropagation()}
      transition={{ duration: 0.2, ease: "easeOut" }}
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.1 }}
      style={{ transformOrigin: "top right" }}
    >
      {dropdownItems}
    </motion.nav>
  );
};

export const DropdownButton = ({ children, openDropdown, setOpenDropdown }) => {
  return (
    <>
      {openDropdown && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setOpenDropdown(false)}
        ></div>
      )}
      <div
        role="button"
        className="relative icon-buttons text-opacity-50 z-50"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        {children[0]}

        <AnimatePresence>
          {openDropdown && <DropdownContent dropdownItems={children[1]} />}
        </AnimatePresence>
      </div>
    </>
  );
};
