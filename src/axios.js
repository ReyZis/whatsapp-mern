import axios from "axios";

const instance = axios.create({
    baseURL: "https://whatsapp-clone-mern-backend.herokuapp.com",
});

export default instance;
