import {SIGNUP, LOGOUT, AUTHORIZE, UPDATE_LOGIN_ERRORS} from "./types"
import {authenticateUser} from "../api/api"



export const loginWithGoogle = (gSignIn) => {

    return function(dispatch) {


         gSignIn().then( data => {  // login with google  
            const token = data.credential.idToken
            // save token to local storage
            localStorage.setItem('fire_token')
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


