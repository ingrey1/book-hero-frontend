import {SIGNUP, LOGOUT, AUTHORIZE, UPDATE_LOGIN_ERRORS, CLEAR_LIBRARY, CLEAR_CURRENT_CHAPTER} from "./types"
import {authenticateUser} from "../api/api"
import {clearLibrary} from './library'
import {clearCurrentChapter} from './currentChapter'


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

export const loginWithGoogle = (gSignIn) => {

    return function(dispatch) {


         gSignIn().then( data => {  // login with google  
            const token = data.credential.idToken
            // save token to local storage
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
         }).catch(err => console.log("google sign in err", err))                         
    }
}


