// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
      getAuth,
      signInWithPopup,
      signInWithRedirect,
      GoogleAuthProvider,
} from "firebase/auth";

import {
      getFirestore,
      doc,
      getDoc,
      setDoc,
} from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvSIb4l9i0eyLnrBqV8mhaCRuVXt9eFD4",
  authDomain: "database-one-e024b.firebaseapp.com",
  projectId: "database-one-e024b",
  storageBucket: "database-one-e024b.appspot.com",
  messagingSenderId: "950008527767",
  appId: "1:950008527767:web:7ad0a14263c4db49a3a2d2",
  measurementId: "G-G8ES302TQW"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
      prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
      // check if user is in the database
     const userDocRef = await doc(db, 'users', userAuth.uid);
     const userSnapshot = await getDoc(userDocRef);

     // check if user data exists
      if (!userSnapshot.exists()) {
            // if not, create user document
            const { displayName, email } = userAuth;
            const createdAt = new Date();
            try {
                  await setDoc(userDocRef, {
                        displayName,
                        email,
                        createdAt,
                  });
            } catch (error) {
                  console.error('Error creating user document', error);
            }
      }

      return userDocRef;

}
