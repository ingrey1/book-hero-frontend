import {SIGNUP, LOGOUT, AUTHORIZE, UPDATE_LOGIN_ERRORS} from "./types"
import {authenticateUser} from "../api/api"
import {clearLibrary} from './library'
import {clearCurrentChapter} from './currentChapter'
const jwt = require('jsonwebtoken');


export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const clearUserStoreAndLogout = () => {
    return function(dispatch){
      dispatch(logout())
      dispatch(clearLibrary())
      dispatch(clearCurrentChapter())
    }
}

// used to protect routes
export const authorizeUserOrLogout = () => {
  const token = localStorage.getItem('fire_token')
  return function(dispatch) {
    authenticateUser(token).then(res => res.json()).then((userAuthInfo => {
               
        if (!userAuthInfo.errors) {
         dispatch({ // user is successfully authenticated
             type: AUTHORIZE,
             payload: userAuthInfo
         })
        
        } else { // log out the unauthorized user
          clearUserStoreAndLogout()
        
        }
     })).catch(err => {
         console.log("backend error", err)
         clearUserStoreAndLogout()
       
     })
  }
}



export const createUserWithEmailPassword = (signupF, email, password) => {
  return function(dispatch) {
    signupF(email, password).then(data => {
         // firebase user
         const email = data.user.email
         // REMOVE LATER: REPLACE WITH LEGIT CUSTOM TOKEN
         localStorage.setItem('fire_token', email)
      // send token to rails backend for auth
      authenticateUser(email).then(res => res.json()).then((userAuthInfo => {
         
         if (!userAuthInfo.errors) {
          dispatch({ // user is successfully authenticated
              type: AUTHORIZE,
              payload: userAuthInfo
          })
         } else { // update errors in store to display errors for user
           dispatch({
               type: UPDATE_LOGIN_ERRORS,
               payload: userAuthInfo.errors
           })
         }
      })).catch(err => console.log("backend error", err))
    }).catch(err => console.log(err))
  }
}

export const loginWithGoogle = (gSignIn, email=null, password=null, authy=null) => {

    return function(dispatch) {
         console.log("inside loginWithGoogle", email, password)
         let f;
         if (email && password) {
           console.log("loginWithGoogle", gSignIn)
           f = gSignIn(email, password)
          } else {
            f = gSignIn()
          }
         
         f.then( data => {  // login with google 
            console.log("login google response:", data) 
            if (data.credential) {
              const token = data.credential.idToken
              //save token to local storage
              localStorage.setItem('fire_token', token)
               // send token to rails backend for auth
            authenticateUser(token).then(res => res.json()).then((userAuthInfo => {
               
              if (!userAuthInfo.errors) {
               dispatch({ // user is successfully authenticated
                   type: AUTHORIZE,
                   payload: userAuthInfo
               })
              } else { // update errors in store to display errors for user
                dispatch({
                    type: UPDATE_LOGIN_ERRORS,
                    payload: userAuthInfo.errors
                })
              }
           })).catch(err => console.log("backend error", err))

            } else  {
              // firebase user
             const email = data.user.email
             // REMOVE LATER: REPLACE WITH LEGIT CUSTOM TOKEN
             localStorage.setItem('fire_token', email)
             
            

             
             
            // send token to rails backend for auth
            authenticateUser(email).then(res => res.json()).then((userAuthInfo => {
               
               if (!userAuthInfo.errors) {
                dispatch({ // user is successfully authenticated
                    type: AUTHORIZE,
                    payload: userAuthInfo
                })
               } else { // update errors in store to display errors for user
                 dispatch({
                     type: UPDATE_LOGIN_ERRORS,
                     payload: userAuthInfo.errors
                 })
               }
            })).catch(err => console.log("backend error", err))
           }
         }).catch(err => console.log("google sign in err", err))                         
    }
}


