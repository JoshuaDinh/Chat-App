import React from "react";
import "./chat.css";
import Avatar from "@material-ui/core/Avatar";
import {
  AttachFile,
  InsertEmoticon,
  MoreVertOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import IconButton from "@material-ui/core/IconButton";
import ChatMessage from "../ChatMessage/ChatMessage";

const Chat = ({ messages }) => {
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

      <div className="chat-input">
        <InsertEmoticon className="icon" />
        <form>
          <input type="text" />
          <button type="submit">Send a message</button>
        </form>
        <MicIcon className="icon" />
      </div>
    </div>
  );
};

export default Chat;
