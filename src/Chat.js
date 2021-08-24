import React, { useEffect, useRef, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import "./Chat.css";
import { SearchOutlined, MoreVert, AttachFile } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios.js";
import Pusher from "pusher-js";
import { connect } from "react-redux";

function Chat({ activeRoom, user, roomName, roomPic }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        console.log("chat: the active room is", activeRoom);
        setMessages(activeRoom.messages);
        console.log("chat: the messages is", activeRoom.messages);
    }, [activeRoom, setMessages]);

    const refrence = useRef(null);

    useEffect(() => {
        const pusher = new Pusher("b9cd2c6dddef57e9452d", {
            cluster: "eu",
        });

        const channel = pusher.subscribe("rooms");
        channel.bind("new message", (newMessage) => {
            console.log("chat: a messages came from puhser", newMessage);
            setMessages([...messages, newMessage]);
        });

        refrence.current.scrollIntoView({ behavior: "smooth" });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages, setMessages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post("/messages/new", {
            name: user.displayName,
            message: input,
            _id: activeRoom,
        });
        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={roomPic} />
                <div className="chat__headerInfo">
                    <h3>{roomName || "Room Name"}</h3>
                    <p>last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => {
                    return (
                        <p
                            className={`chat__message ${
                                user.displayName === message.name &&
                                "chat__receiver"
                            }`}
                        >
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">
                                {message.createdAt}
                            </span>
                        </p>
                    );
                })}
                <div ref={refrence}></div>
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Type a message"
                    />
                    <button onClick={sendMessage} type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default connect((currentStore) => {
    return {
        activeRoom: currentStore.activeRoom,
        user: currentStore.user,
        roomName: currentStore.activeRoomName,
        roomPic: currentStore.activeRoomPic,
    };
})(Chat);
