import firebase from "firebase";

// authentication
import "firebase/auth";

// realtime database
import "firebase/database";

// storage can store images,vides,pdf, etc
import "firebase/storage";

// from website (goto setting > project setting > scroll end > select config copy and paste below)
const firebaseConfig = {
    apiKey: "AIzaSyDltpYmBYXlaFF_toAgDIKa-fZ7B1GHmrc",
    authDomain: "voot-c4a6c.firebaseapp.com",
    projectId: "voot-c4a6c",
    storageBucket: "voot-c4a6c.appspot.com",
    messagingSenderId: "841040863982",
    appId: "1:841040863982:web:6615fbca2fc2dea3e349ff"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;