import { createStore } from "redux";

// action creators
function setUser(user) {
    return {
        type: "SET_USER",
        data: user,
    };
}

const setActiveRoom = (roomId) => {
    return {
        type: "SET_ROOM",
        data: {
            activeRoom: roomId,
        },
    };
};

//reducer function
function reducer(currentStore, action) {
    const initialStore = {
        user: {
            email: null,
        },
        rooms: [],
        activeRoom: null,
    };
    switch (action.type) {
        case "SET_USER":
            return {
                user: action.data,
                activeRoom: currentStore.activeRoom,
                rooms: currentStore.rooms,
            };
        case "SET_ROOM":
            return { ...currentStore, activeRoom: action.data.activeRoom };
        default:
            return initialStore;
    }
}

const appStore = createStore(reducer);

export { setUser, setActiveRoom };

export default appStore;
