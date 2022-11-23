import React from 'react';
import { motion } from "framer-motion";

import EditField from "components/ui/Form/EditField";

import { defaultTransitions } from "data/constants";
import { editProfileField } from 'redux/actions/editProfileAction';

const Field = ({ title, content, fieldType, openModal }) => {
  return (
    <motion.div
      className="px-8 pt-2 pb-4 bg-white w-full shadow"
      initial={{ y: "-50px", opacity: 0 }}
      transition={defaultTransitions}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="mb-4 text-green-title text-sm">{title}</div>

      <EditField
        content={content}
        fieldType={fieldType}
        action={editProfileField}
        openModal={openModal}
      />
    </motion.div>
  );
}

export default Field;