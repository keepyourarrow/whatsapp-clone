import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Message from "./Message";

import { deleteMessage } from "redux/actions/roomsActions";
import { scrollToBottom } from "../utils";
import LoadingGif from "assets/icons/LoadingGif";

const ChatBox = ({ messages, createdBy }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.firebase.profile.userName);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDelete = (message) => {
    dispatch(deleteMessage(message));
  }

  if (!messages) {
    return (
      <div className="flex justify-center mb-4 pb-2">
        <div className="bg-white rounded-full shadow flex justify-center">
          <LoadingGif className="h-12 w-12 text-green-border" />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 pb-2">
      {messages.map((message, i) => {
        return (
          <Message
            key={i}
            {...message}
            createdBy={createdBy}
            currentUser={currentUser}
            handleDelete={() => handleDelete(message)}
          />
        );
      })}
    </div>
  );
};

export default ChatBox;