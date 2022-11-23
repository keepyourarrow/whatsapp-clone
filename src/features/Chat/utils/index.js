import moment from "moment";

export const getSenderName = (createdBy, currentUser) => {
  return createdBy === currentUser ? "You" : createdBy;
};

export const getTime = (date) => {
  return moment(date).format("h:mm A");
};

export const scrollToBottom = () => {
  let chatBoxContainer = document.querySelector("#chatbox-container");
  chatBoxContainer.scrollTop = chatBoxContainer.scrollHeight;
};

export const formatTime = (createdAt) => {
  return moment(createdAt).format("MMMM Do YYYY, h:mm:ss A")
}

export const getDescription = ({ description, name, createdAt, createdBy }) => {
  if (description) {
    return description;
  }

  return `The "${name}" room was created on ${formatTime(createdAt)} by "${createdBy}"`;
};
