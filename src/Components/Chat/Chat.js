import React from "react";
import "./chat.css";
import Avatar from "@material-ui/core/Avatar";
import {
  AttachFile,
  MoreVertOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import ChatMessage from "../ChatMessage/ChatMessage";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-header ">
        <Avatar />

        <div className="chat-header-info">
          <h3>Room Name</h3>
          <p> Last seen at ,...</p>
        </div>
        <div className="chat-header-right">
          <IconButton>
            <SearchOutlined className="chat-icons" />
          </IconButton>
          <IconButton>
            <AttachFile className="chat-icons" />
          </IconButton>
          <IconButton>
            <MoreVertOutlined className="chat-icons" />
          </IconButton>
        </div>
      </div>

      <div className="chat-body">
        <ChatMessage />
      </div>
    </div>
  );
};

export default Chat;
