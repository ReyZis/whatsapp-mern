import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";

function reducer(currentStore, action) {
    const initialStore = {
        email: null,
        activeRoom: null,
    };
    switch (action.type) {
        case "SET_USER":
            return { ...action.data, activeRoom: currentStore.activeRoom };
        case "SET_ROOM":
            return { ...currentStore, activeRoom: action.data.activeRoom };
        default:
            return initialStore;
    }
}

const appStore = createStore(reducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={appStore}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
