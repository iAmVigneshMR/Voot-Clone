import firebase from "firebase";

// authentication
import "firebase/auth";

// realtime database
import "firebase/database";

// storage can store images,vides,pdf, etc
import "firebase/storage";

// from website (goto setting > project setting > scroll end > select config copy and paste below)
const firebaseConfig = {
    apiKey: "AIzaSyDltpYmaFF_toDIKa-fZ1GHmrc",
    authDomain: "voot-c6c.firebeapp.com",
    projectId: "voot-c6c",
    storageBucket: "voot-c6c.appspot.com",
    messagingSenderId: "841063982",
    appId: "1:84103982:web:6615fbca2fce349ff"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;
