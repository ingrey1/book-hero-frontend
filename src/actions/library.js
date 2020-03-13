import {SET_USER_LIBRARY, UPDATE_LIBRARY_RETRIEVAL_ERRORS} from './types'
import {getUserBooks} from '../api/api'


export function retrieveLibrary(userId) {

   return function(dispatch) {

      const token = localStorage.getItem('fire_token')
      getUserBooks(userId, token).then(res => res.json()).then(data => {
         if (!data.errors) {
             dispatch({
                 type: SET_USER_LIBRARY,
                 payload: data
             })
         } else {

            dispatch({
                type: UPDATE_LIBRARY_RETRIEVAL_ERRORS,
                payload: data.errors
            })
             
         }    
      }).catch(err => {
          console.log("error retrieving library", err)
          dispatch({
            type: UPDATE_LIBRARY_RETRIEVAL_ERRORS,
            payload: [err.message]
        })
      })
   }
}
