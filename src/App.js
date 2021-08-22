import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios.js";
import Login from "./Login.js";
import { connect } from "react-redux";

function App({ user }) {
    console.log("app: current user is", user);

    useEffect(() => {
       
    }, [user])
    
    return (
        <div className="app">
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

export default connect((currentStore) => {
    return {
        user: currentStore.user,
    };
})(App);
