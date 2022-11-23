import React from 'react'
import { useSelector } from 'react-redux';

const UploadPhoto = ({ image, toggleModal }) => {
  const {secondBtnAction} = useSelector((state) => state.modal);

  return (
    <div className="h-64" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-center items-center">
        <img
          className="w-48 h-48 object-cover object-center rounded-full"
          src={image}
          alt=""
        />
      </div>

      <div className="flex justify-end items-center mt-5">
        <button
          className="px-6 py-2 text-white uppercase tracking-wide rounded transition duration-200 ease-in bg-exit-button-green hover:bg-opacity-75 hover:shadow-lg focus:outline-none"
          onClick={() => {
            toggleModal();
            secondBtnAction();
          }}
        >
          Upload
        </button>
      </div>
    </div>
  )
}

export default UploadPhoto