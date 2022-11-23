export const getSenderName = (whoSentLastMessage, createdBy, currentUser) => {
  // admin sends messages like "created a room"
  if (whoSentLastMessage == 'admin') {
    if (createdBy === currentUser) {
      return "You ";
    } else {
      return createdBy + " "
    }
  }

  return whoSentLastMessage === currentUser ? "You: " : whoSentLastMessage + ": ";
}

export const sortRoomsDesc = (rooms) => {
    return rooms.sort((a,b) => {
      if (a.lastMessageSentAt < b.lastMessageSentAt) return 1;

      return -1;
    })
}
