import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD9FEa5z-WTzlf5rrRs8efb6ilOBGYe6xE",
    authDomain: "whatsapp-clone-49972.firebaseapp.com",
    projectId: "whatsapp-clone-49972",
    storageBucket: "whatsapp-clone-49972.appspot.com",
    messagingSenderId: "385537924165",
    appId: "1:385537924165:web:c9fcdc2a8d8636a09a972c",
};

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
export { provider, auth };
