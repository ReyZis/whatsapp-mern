import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios.js";
import Login from "./Login.js";
import { connect } from "react-redux";

function App({ currentStore }) {
    

    console.log("app: current user is", currentStore);
    return (
        <div className="app">
            <div className="app__body">
                {!currentStore.email ? (
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

export default connect((user) => {
    return {
        currentStore: user,
    };
})(App);
