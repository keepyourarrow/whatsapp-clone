import React from "react";

import DefaultProfileImg from "features/Chat/assets/DefaultProfileImg"

import { getSenderName } from "../../utils";

const Participants = ({ participants, currentUser, createdBy }) => {
  return (
    <div className="mt-3 bg-white ">
      <div className="pl-6 pr-8 py-2 flex items-center justify-between">
        <div className="text-green-title text-sm mb-2">
          {participants.length} participants
        </div>
      </div>
      {/* Default buttons here */}

      {participants.map((participant, index) => {
        return (
          <div
            key={participant.id}
            className="room-info-participants justify-between items-start "
          >
            <div
              className={
                "flex items-start space-x-4 " + (index === 0 && "max-w-xs-")
              }
            >
              {/* Avatar  */}
              {participant.photo ? (
                <img
                  className="w-12 h-12 object-cover object-center rounded-full"
                  src={participant.photo}
                  alt="user-avatar"
                />
              ) : (
                <DefaultProfileImg />
              )}
              {/* User name */}
              {index === 0 ? (
                <span className="text-md truncate">
                  {getSenderName(createdBy, currentUser)}
                </span>
              ) : (
                <span className="text-md">
                  {getSenderName(participant.name, currentUser)}
                </span>
              )}
            </div>
            {index === 0 && (
              <div className="py-xs px-1 text-green-room-info-admin border border-green-room-info-admin rounded text-xs leading-tight">
                Group admin
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Participants;