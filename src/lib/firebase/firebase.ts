import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyASW7uw62MkdSddTyYDkxRtCJsuLf42V_w",
    authDomain: "tpa-web-ef.firebaseapp.com",
    projectId: "tpa-web-ef",
    storageBucket: "tpa-web-ef.appspot.com",
    messagingSenderId: "860058941120",
    appId: "1:860058941120:web:cfbb98f8e5aabaefcf9f25"
};

// initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export {storage};
