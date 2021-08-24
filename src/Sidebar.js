import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// material ui
import {
    IconButton,
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    InputAdornment,
} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import { AccountCircle, SearchOutlined } from "@material-ui/icons";

// external files
import SidebarChat from "./SidebarChat";
import "./Sidebar.css";
import axios from "./axios.js";

import { setActiveRoom, setRooms } from "./reducer";

function Sidebar({ user, rooms, setRooms }) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const makeRoom = (e) => {
        e.preventDefault();
        if (input) {
            axios
                .post("/rooms/new", {
                    userOne: user.email,
                    userTwo: input,
                    messages: [],
                })
                .then((response) => {
                    if (response.data !== "this room already exist") {
                        setRooms([...rooms, response.data]);
                        console.log(
                            "sidebar: the current rooms list after making new one is ",
                            response.data
                        );
                    }
                });
            setOpen(false);
            setInput("");
        } else {
            setOpen(false);
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__headerLeft">
                    <Avatar src={user.photoURL} />
                    <span className="sidebar__name">{user.displayName}</span>
                </div>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <Button onClick={() => setOpen(true)}>
                    <AddIcon fontSize="large" />
                    <h2 className="sidebar__addChatText">Add a chat</h2>
                </Button>
                {rooms.map((room) => (
                    <SidebarChat roomDetails={room} />
                ))}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add a Room</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To make a room, please enter the email of your friend
                        here.
                    </DialogContentText>
                    <form onSubmit={(e) => makeRoom(e)}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            autoFocus
                            margin="dense"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        className="sidebar__dialogButton"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        type="submit"
                        className="sidebar__dialogButton"
                        onClick={makeRoom}
                    >
                        Add Room
                    </Button>
                </DialogActions>
            </Dialog>
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
)(Sidebar);
