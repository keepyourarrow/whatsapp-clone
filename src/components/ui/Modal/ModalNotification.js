import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalNotification = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const {message, payload, firstBtn, secondBtn, secondBtnAction} = useSelector((state) => state.modal);

  const mainBtnStyles = "px-6 py-2 text-white uppercase tracking-wide rounded transition duration-200 ease-in bg-exit-button-green hover:bg-opacity-75 hover:shadow-lg focus:outline-none";
  const secondaryBtnStyles = "px-6 py-2 uppercase tracking-wide text-green-link hover:bg-white hover:shadow-cancel-button focus:outline-none";

  return (
    <div className="py-2 " onClick={(e) => e.stopPropagation()}>
      <div className="pb-4">
        <span>{message}</span>
      </div>
      <div className="pt-12 flex justify-end items-center space-x-1 w-full text-sm  ">
        {firstBtn && (
          <button
            className={secondBtn ? secondaryBtnStyles : mainBtnStyles}
            onClick={toggleModal}
          >
            {firstBtn}
          </button>
        )}
        {secondBtn && (
          <button
            className={mainBtnStyles}
            onClick={() => {
              toggleModal();
              dispatch(secondBtnAction(payload));
            }}
          >
            {secondBtn}
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalNotification;