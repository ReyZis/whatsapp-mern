import { createStore } from "redux";

// action creators
const setUser = (user) => {
    return {
        type: "SET_USER",
        data: user,
    };
};

const setActiveRoom = (roomData) => {
    return {
        type: "SET_ACT_ROOM",
        data: roomData,
    };
};

const setActiveRoomName = (name) => {
    return {
        type: "SET_ACT_NAME",
        data: name,
    };
};

const setActiveRoomPic = (url) => {
    return {
        type: "SET_ACT_PIC",
        data: url,
    };
};

const setRooms = (roomArr) => {
    return {
        type: "SET_ROOMS",
        data: roomArr,
    };
};

//reducer function
function reducer(currentStore, action) {
    const initialStore = {
        user: {
            email: null,
        },
        rooms: [],
        activeRoom: {
            messages: [],
        },
        activeRoomName: "",
        activeRoomPic: "",
    };
    switch (action.type) {
        case "SET_USER":
            return { ...currentStore, user: action.data };
        case "SET_ACT_ROOM":
            return { ...currentStore, activeRoom: action.data };
        case "SET_ACT_NAME":
            return { ...currentStore, activeRoomName: action.data };
        case "SET_ACT_PIC":
            return { ...currentStore, activeRoomPic: action.data };
        case "SET_ROOMS":
            return { ...currentStore, rooms: action.data };
        default:
            return initialStore;
    }
}

const appStore = createStore(reducer);

export {
    setUser,
    setActiveRoom,
    setRooms,
    setActiveRoomName,
    setActiveRoomPic,
};

export default appStore;
