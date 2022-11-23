import React from 'react';

import WindowsIcon from '../assets/WindowsIcon';

const NoMessages = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-white border-b-6 border-green-border ">
      <div className="w-3/4 max-w-md flex flex-col justify-center items-center mx-auto text-center">
        <div
          className="bg-center w-88 h-88 rounded-full"
          style={{
            backgroundImage:
              "url(https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg)",
          }}
        ></div>
        <div className="mt-10 text-gray-900 text-opacity-75 text-4xl font-light leading-9">
          Keep your phone connected
        </div>
        <div className="mt-6 text-gray-900 text-opacity-50 text-sm">
          WhatsApp connects to your phone to sync messages. To reduce data
          usage, connect your phone to Wi-Fi.
        </div>
        <div className="mt-6 border-t border-gray-400 border-opacity-50 w-full">
          <div className="mb-8"></div>
          <div className="flex justify-center items-center space-x-1  text-gray-900 text-opacity-50 text-sm">
            <span>
              <WindowsIcon />
            </span>
            <div>
              WhatsApp is available for Windows.{" "}
              <a href="#" className=" text-green-link">
                Get it here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoMessages;