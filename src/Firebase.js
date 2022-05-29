import firebase from "firebase"

const config={
    apiKey: "AIzaSyCkhztum57q7zn2p76SW4W2aULUzrRr5q8",
    authDomain: "fir-cloud-messaging-58b75.firebaseapp.com",
    projectId: "fir-cloud-messaging-58b75",
    storageBucket: "fir-cloud-messaging-58b75.appspot.com",
    messagingSenderId: "915224610897",
    appId: "1:915224610897:web:40f2a0789cfddbc8a4d070"
}

firebase.initializeApp(config);

export default firebase