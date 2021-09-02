import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios.js";
import Login from "./Login.js";
import { connect } from "react-redux";
import { setActiveRoom, setRooms } from "./reducer.js";

function App({ user, setActiveRoom, rooms }) {
    return (
        <div className="app">
                <h1>NOT THE REAL WHATSAPP</h1>
            <div className="app__body">
                {!user.email ? (
                    <Login />
                ) : (
                    <>
                        <Sidebar />
                        <Chat />
                    </>
                )}
            </div>
        </div>
    );
}

export default connect(
    (currentStore) => {
        return {
            user: currentStore.user,
            rooms: currentStore.rooms,
        };
    },
    {
        setActiveRoom,
        setRooms,
    }
)(App);
