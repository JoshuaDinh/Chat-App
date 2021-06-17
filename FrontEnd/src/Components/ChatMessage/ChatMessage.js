import React from "react";
import "./chatMessage.css";

const ChatMessage = () => {
  return (
    <div className="chat-message">
      <span className="chat-name">josh</span>this is a message
      <span className="chat-timestamp">{new Date().toUTCString()}</span>
    </div>
  );
};

export default ChatMessage;
