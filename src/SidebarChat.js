import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import "./SidebarChat.css";
import {
    setActiveRoom,
    setActiveRoomName,
    setActiveRoomPic,
} from "./reducer.js";
import { connect } from "react-redux";

function SidebarChat({
    user,
    roomDetails,
    setActiveRoom,
    setActiveRoomName,
    setActiveRoomPic,
}) {
    const [compUser, setCompUser] = useState({});

    useEffect(() => {
        axios
            .post("/users/sync", {
                email:
                    roomDetails.userOne !== user.email
                        ? roomDetails.userOne
                        : roomDetails.userTwo,
            })
            .then((response) => {
                setCompUser({
                    name: response.data.name,
                    photo: response.data.photo,
                });
            });
    }, [roomDetails]);

    return (
        <div
            className="sidebarChat"
            onClick={() => {
                console.log(
                    "SidebarChat: the current active room's id is :",
                    roomDetails
                );
                setActiveRoom(roomDetails);
                setActiveRoomName(compUser.name);
                setActiveRoomPic(compUser.photo);
            }}
        >
            <Avatar src={compUser.photo} />
            <div className="sidebarChat__info">
                <h2>{compUser.name}</h2>
            </div>
        </div>
    );
}

export default connect(
    (currentStore) => {
        return {
            user: currentStore.user,
        };
    },
    {
        setActiveRoom,
        setActiveRoomName,
        setActiveRoomPic,
    }
)(SidebarChat);
