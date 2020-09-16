import React from "react";

const RemainingSpace = ({ remainingSpace }) => {
  return (
    <span
      className={
        "mx-1 text-sm leading-7 " +
        (remainingSpace < 0 ? "text-red-500" : "text-gray-500  text-opacity-50")
      }
    >
      {remainingSpace}
    </span>
  );
};

export default RemainingSpace;
