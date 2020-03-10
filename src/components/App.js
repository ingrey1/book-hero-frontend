import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import Main from './Main'


const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const gProvider = new firebase.auth.GoogleAuthProvider();
gProvider.setCustomParameters({
  prompt: 'select_account'
}) 
const providers = {
  googleProvider: gProvider 
};

function App(props) {

  const {signInWithGoogle, signOut} = props

  return (
    <div className="App">
         <Main signInWithGoogle={signInWithGoogle} signOut={signOut} />
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
