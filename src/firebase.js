import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCVO7xY1JQrApeQ_l53bhhEhcxYRULEYTw",
    authDomain: "whatsapp-mern-2e743.firebaseapp.com",
    projectId: "whatsapp-mern-2e743",
    storageBucket: "whatsapp-mern-2e743.appspot.com",
    messagingSenderId: "245870347326",
    appId: "1:245870347326:web:47052d587cff8d8f557d6f",
};

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
export { provider, auth };