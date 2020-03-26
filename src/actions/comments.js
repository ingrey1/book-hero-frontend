import {SET_COMMENTS} from './types'
import {getComments, createComment} from '../api/api'


export const setComments = (comments) => {
    return {
        type: SET_COMMENTS,
        payload: comments
    }
}

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
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

export const createAndSetComment = (userId, bookId, chapterId, content) => {
    return function(dispatch) {
        createComment(localStorage.getItem('fire_token', userId, bookId, chapterId, content)).then(res => res.json()).then(comment => {
            if (!data.errors) {
                dispatch(addComment(comment))
            } else {
                // handle errors
            }
           
        }).catch(err => console.log(err))
    }
} 
