import React from "react";
import "./Login.css";
import img from "./whatsapp.png";
import { Button } from "@material-ui/core";
import { provider, auth } from "./firebase";
import { connect } from "react-redux";
import axios from "./axios.js";

function setUserTo(user) {
    return {
        type: "SET_USER",
        data: user,
    };
}

function Login({ setUserTo }) {
    const login = () => {
        auth.signInWithPopup(provider)
            .then(async (result) => {
                setUserTo(result.user);
                await axios.post("/users/new", {
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    rooms: [],
                });
                console.log("login: current user is", result.user);
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
    (user) => {
        return {
            currentStore: user,
        };
    },
    {
        setUserTo,
    }
)(Login);
