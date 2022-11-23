import React, { useState } from "react";
import { motion } from "framer-motion";

import { defaultTransitions } from "data/constants";

export const CheckboxField = () => {
  const [selected, setSelected] = useState(false);
  return (
    <motion.div
      className="flex items-center ml-6 mt-6 px-6 w-10/12 h-24 bg-gray-100 shadow rounded-br-full rounded-tl-full"
      transition={defaultTransitions}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <label className="ml-6" htmlFor="private">
        <input
          className="mr-3 form-checkbox shadow"
          type="checkbox"
          name="private"
          id="private"
          checked={selected}
          onChange={(e) => setSelected(!selected)}
        />
        <span className="text-gray-900 text-lg font-bold">private</span>
      </label>
    </motion.div>
  );
};
