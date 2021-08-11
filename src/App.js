import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios.js";

function App() {
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

    console.log(messages);

    return (
        <div className="app">
            <div className="app__body">
                <Sidebar />
                <Chat messages={messages} />
            </div>
        </div>
    );
}

export default App;
