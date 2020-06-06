import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';
import {Grid, Row, Col} from 'react-bootstrap'
import Main from '../Main/Main'


const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const gProvider = new firebase.auth.GoogleAuthProvider();
const usernamePasswordProvider = new firebase.auth.EmailAuthProvider()
gProvider.setCustomParameters({
  prompt: 'select_account'
}) 
const providers = {
  googleProvider: gProvider,
  emailAuthProvider: usernamePasswordProvider
};

function App(props) {
  console.log(props) 
  const {signInWithGoogle, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} = props

  return (
    <div className="App">
         <Main user={props.user} firebaseAppAuth={firebaseAppAuth} providers={providers} signInWithGoogle={signInWithGoogle} signInWithEmailAndPassword={signInWithEmailAndPassword} createUserWithEmailAndPassword={createUserWithEmailAndPassword} signOut={signOut} />
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
