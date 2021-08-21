import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import "./SidebarChat.css";

function SidebarChat({ roomEmail, lastMessage }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        axios.post("/users/sync", { email: roomEmail }).then((response) => {
            setUser({
                name: response.data.name,
                photo: response.data.photo,
            });
        });
    }, [roomEmail]);

    return (
        <div className="sidebarChat">
            <Avatar src={user.photo} />
            <div className="sidebarChat__info">
                <h2>{user.name}</h2>
                <p>{lastMessage}</p>
            </div>
        </div>
    );
}

export default SidebarChat;
