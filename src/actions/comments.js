import {SET_COMMENTS} from './types'
import {getComments} from '../api/api'


export const setComments = (comments) => {
    return {
        type: SET_COMMENTS,
        payload: comments
    }
}

export const retrieveAndSetComments = (userId, bookId, chapterId) => {
    return function(dispatch) {
        getComments(localStorage.getItem('fire_token', userId, bookId, chapterId)).then(res => res.json()).then(comments => {
            if (!data.errors) {
                dispatch(setComments(comments))
            } else {
                // handle errors
            }
           
        }).catch(err => console.log(err))
    }
} 
