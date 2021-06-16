import React from "react";
import "./chatRooms.css";
import Avatar from "@material-ui/core/Avatar";

const ChatRooms = ({ roomName }) => {
  return (
    <div className="chatRooms">
      <Avatar />
      <div className="chatRooms-info">
        <h4>{roomName}</h4>
        <p>text</p>
      </div>
    </div>
  );
};

export default ChatRooms;
