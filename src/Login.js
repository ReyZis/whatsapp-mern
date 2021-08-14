import React from "react";
import "./Login.css";
import img from "./whatsapp.png";
import { Button } from "@material-ui/core";
import { provider, auth } from "./firebase";
import { connect } from "react-redux";

function setUserTo(user) {
    return {
        type: "SET_USER",
        newUser: user,
    };
}

function Login({ setUserTo }) {
    const login = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                setUserTo(result.user);
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
            currentUser: user,
        };
    },
    {
        setUserTo,
    }
)(Login);
