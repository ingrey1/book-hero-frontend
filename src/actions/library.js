import {SET_USER_LIBRARY, UPDATE_LIBRARY_RETRIEVAL_ERRORS, ADD_BOOK_TO_LIBRARY,
     SET_FILTER_USER_BOOKS_VALUE, SET_SORT_USER_BOOKS_VALUE, SEARCH_AND_FILTER_LIBRARY, CLEAR_LIBRARY} from './types'
import {getUserBooks, addBook} from '../api/api'
import {removeBookFromAllBooks} from './books'


export const addBookToLibrary = (book) => {
    return {
        type: ADD_BOOK_TO_LIBRARY,
        payload: book
    }
}

export const clearLibrary = () => {
    return {
      type: CLEAR_LIBRARY
    }
  }

export function searchAndFilterLibrary(newSearchTitle) {
    return {
       type: SEARCH_AND_FILTER_LIBRARY,
       payload: newSearchTitle
    }
}


export function setSortUserBooksValue(newSortInfo) {
    return {
       type: SET_SORT_USER_BOOKS_VALUE,
       payload: newSortInfo
    }
}

export function setFilterUserBooksValue(newFilterInfo) {
    return {
       type: SET_FILTER_USER_BOOKS_VALUE,
       payload: newFilterInfo
    }
}

export function addBookAndUpdateStore(userId, bookId){
    return function(dispatch) {
        const token = localStorage.getItem('fire_token') 
        addBook(token, userId, bookId).then(res => res.json()).then(book => {
           if (!book.errors) {
            dispatch(addBookToLibrary(book))
            dispatch(removeBookFromAllBooks(book.id))
           }
           
        }).catch(err => console.log(err))

    }
}



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
