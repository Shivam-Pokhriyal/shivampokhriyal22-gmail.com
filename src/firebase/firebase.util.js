import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDBh_nw43dugTW6Wpr1t4GHUXebzozy-94",
    authDomain: "crwn-db-605d6.firebaseapp.com",
    databaseURL: "https://crwn-db-605d6.firebaseio.com",
    projectId: "crwn-db-605d6",
    storageBucket: "crwn-db-605d6.appspot.com",
    messagingSenderId: "275445002838",
    appId: "1:275445002838:web:0238f647c90a7ecf85c1f7",
    measurementId: "G-9PKBFV2ZBB"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email}=userAuth;
      const createdAt=new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
          console.log('error creating user',error.message);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth=firebase.auth();
  export const firestore=firebase.firestore();

  const provider= new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});

  export const signInWithGoogle=()=>auth.signInWithPopup(provider);

  export default firebase;