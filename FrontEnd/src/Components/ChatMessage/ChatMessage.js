import React from "react";
import "./chatMessage.css";

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.recieved && "chat-reciever"}`}>
      <span className="chat-name">{message.name}</span>
      <span className={` ${message.recieved && "chat-reciever"}`}>
        {message.message}
      </span>
      <span className="chat-timestamp">{new Date().toUTCString()}</span>
    </div>
  );
};

export default ChatMessage;
