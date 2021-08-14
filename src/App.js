import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios.js";
import Login from "./Login.js";
import { connect } from "react-redux";

function App({ currentUser }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get("/messages/sync").then((response) => {
            setMessages(response.data);
        });
    }, []);

    useEffect(() => {
        const pusher = new Pusher("b9cd2c6dddef57e9452d", {
            cluster: "eu",
        });

        const channel = pusher.subscribe("messages");
        channel.bind("inserted", (newMessages) => {
            setMessages([...messages, newMessages]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages]);

    console.log("app: message", messages);
    console.log("app: current user is", currentUser.email);
    return (
        <div className="app">
            <div className="app__body">
                {!currentUser.email ? (
                    <Login />
                ) : (
                    <>
                        <Sidebar />
                        <Chat messages={messages} />
                    </>
                )}
            </div>
        </div>
    );
}

export default connect((user) => {
    return {
        currentUser: user,
    };
})(App);
