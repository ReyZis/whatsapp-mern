import React, { useState } from "react";
import "./Login.css";
import img from "./whatsapp.png";
import { Button } from "@material-ui/core";
import { provider, auth } from "./firebase";
import { connect } from "react-redux";
import axios from "./axios.js";
import {
    setUser,
    setActiveRoom,
    setRooms,
    setActiveRoomName,
    setActiveRoomPic,
} from "./reducer.js";

function Login({
    setUser,
    setRooms,
    setActiveRoom,
    setActiveRoomName,
    setActiveRoomPic,
}) {
    let room;

    const login = () => {
        auth.signInWithPopup(provider)
            .then(async (result) => {
                setUser(result.user);

                await axios.post("/users/new", {
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    rooms: [],
                });

                await axios
                    .post("/rooms/sync", { email: result.user.email })
                    .then((response) => {
                        setRooms([...response.data]);
                        setActiveRoom(response.data[0]);

                        // this var is just for getting the room name and pic in the next axios post
                        room = response.data[0];
                    });
                if (room) {
                    await axios
                        .post("/users/sync", {
                            email:
                                room.userOne !== result.user.email
                                    ? room.userOne
                                    : room.userTwo,
                        })
                        .then((response) => {
                            setActiveRoomName(response.data.name);
                            setActiveRoomPic(response.data.photo);
                        });
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, ":", errorMessage);
            });
    };

    return (
        <div className="login">
            <img className="login__icon" src={img} alt="whatsapp icon" />
            <Button type="submit" onClick={login}>
                Log in with google
            </Button>
        </div>
    );
}

export default connect(
    (currentStore) => {
        return {};
    },
    {
        setUser,
        setRooms,
        setActiveRoom,
        setActiveRoomName,
        setActiveRoomPic,
    }
)(Login);
