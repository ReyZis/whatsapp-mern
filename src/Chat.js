import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import { SearchOutlined, MoreVert, AttachFile } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios.js";
import Pusher from "pusher-js";
import { connect } from "react-redux";

function Chat({ currentStore }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        axios
            .post("/messages/sync", {
                _id: currentStore.activeRoom,
            })
            .then((response) => {
                const resMsg = response.data;
                setMessages(response.data);
                console.log("chat: this is the room's messages", resMsg);
            });
    }, [currentStore.activeRoom, setMessages]);

    useEffect(() => {
        const pusher = new Pusher("b9cd2c6dddef57e9452d", {
            cluster: "eu",
        });

        const channel = pusher.subscribe("rooms");
        channel.bind("new message", (newMessage) => {
            console.log(newMessage);
            setMessages([...messages, newMessage]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages, setMessages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post("/messages/new", {
            name: currentStore.displayName,
            message: input,
            _id: currentStore.activeRoom,
        });
        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
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
                                currentStore.displayName === message.name &&
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

export default connect((data) => {
    return {
        currentStore: data,
    };
})(Chat);
