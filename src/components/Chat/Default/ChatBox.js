import React, { useEffect, useState } from "react";
import moment from "moment";
import { dateToFromNowDaily } from "../../reusable/functions/functions";
import { useDispatch, useSelector } from "react-redux";
import { LoadingGifSVG } from "../../../assets/images/loadingGif";
import { TrashSolid } from "@graywolfai/react-heroicons";
import { deleteMessage } from "../../../redux/actions/roomsActions";

export const ChatBox = ({ messages, createdBy }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.firebase.profile.userName);

  useEffect(() => {
    // scroll to botttom
    let chatBoxContainer = document.querySelector("#chatbox-container");
    chatBoxContainer.scrollTop = chatBoxContainer.scrollHeight;
  }, [messages]);

  if (!messages) {
    return (
      <div className="flex justify-center mb-4 pb-2">
        <div className="bg-white rounded-full shadow flex justify-center">
          <LoadingGifSVG className="h-12 w-12 text-green-border" />
        </div>
      </div>
    );
  }
  return (
    <div className="mb-4 pb-2">
      {messages.map((message, i) => {
        return (
          <div key={i}>
            {message.from === "admin" && (
              <div className="mb-4 flex flex-col justify-center items-center space-y-4">
                <div className="py-1 px-3 bg-azure text-sm text-gray-800 rounded-lg shadow">
                  {dateToFromNowDaily(message.date)}
                </div>
                <div className="py-1 px-3 bg-azure text-sm text-gray-800 rounded-lg shadow">
                  {createdBy === currentUser ? "You" : createdBy}
                  {message.message}
                </div>
              </div>
            )}

            {message.from !== "admin" && (
              <div
                className={
                  "px-1/11 w-auto flex space-x-1 " +
                  (message.message.length > 60 ? "items-end" : "items-center")
                }
              >
                <div
                  className={
                    "relative inline-block mb-1 px-2 py-2  max-w-3/5 rounded-lg shadow whitespace-pre-line " +
                    (message.from === currentUser
                      ? "bg-chat-box-user-message ml-auto"
                      : "bg-white")
                  }
                >
                  <div>
                    {message.from !== currentUser && (
                      <div className="text-sm text-other-users-message-from leading-6 font-medium">
                        {message.from}
                      </div>
                    )}
                    <div className="flex items-end break-words">
                      <div className="flex-1">
                        <span className="text-black whitespace-normal">
                          {message.message}
                        </span>
                      </div>
                      <div className="ml-4 leading-3 text-right text-xs text-gray-600">
                        <span>{moment(message.date).format("h:mm A")}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {currentUser && currentUser === message.from && (
                  <div className="flex justify-end">
                    <button
                      tabIndex="-1"
                      type="button"
                      className="text-red-500 hover:text-red-400 focus:outline-none"
                      onClick={(e) => {
                        dispatch(deleteMessage(message));
                      }}
                    >
                      <TrashSolid className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
