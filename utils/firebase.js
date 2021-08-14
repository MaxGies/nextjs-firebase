import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAgSTYtv0an3OsoBCXGZmHnvIaBirCR01g",
    authDomain: "nextjs-firebase-64451.firebaseapp.com",
    projectId: "nextjs-firebase-64451",
    storageBucket: "nextjs-firebase-64451.appspot.com",
    messagingSenderId: "339291041998",
    appId: "1:339291041998:web:5036b037fc5e5277f3a09f"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

export { firestore };