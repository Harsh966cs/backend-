import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDeBBDpT5r4iz3s5kz5MUjQgj3F5V8H1GI",
    authDomain: "blogwebsite-8f73f.firebaseapp.com",
    projectId: "blogwebsite-8f73f",
    storageBucket: "blogwebsite-8f73f.appspot.com",
    messagingSenderId: "763093824007",
    appId: "1:763093824007:web:105d21cba90f3e0511b0a2",
    measurementId: "G-C0JKW6PVFR"
}

const userConfig = initializeApp(firebaseConfig);

export default userConfig;