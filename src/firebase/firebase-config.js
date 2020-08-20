import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';

  // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCPTQ4EClN28HQWASN48go6DVTN5CuKXcU",
        authDomain: "react-app-cursos-c8799.firebaseapp.com",
        databaseURL: "https://react-app-cursos-c8799.firebaseio.com",
        projectId: "react-app-cursos-c8799",
        storageBucket: "react-app-cursos-c8799.appspot.com",
        messagingSenderId: "928278727129",
        appId: "1:928278727129:web:888c64bf6438ad45d6b1c8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Grabar información , apuntaremos a la base de datos de firebase
  const db =  firebase.firestore();

  // Auth provider para que podamos hacer la autenticación con google
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }