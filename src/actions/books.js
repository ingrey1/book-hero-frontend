import {SET_BOOKS, REMOVE_BOOK_FROM_ALL_BOOKS} from './types'
import {getAllBooks} from '../api/api'

export const setBooks = (books) => {
    return {
        type: SET_BOOKS,
        payload: books
    }
}

export const removeBookFromAllBooks = (bookId) => {

    return {
        type: REMOVE_BOOK_FROM_ALL_BOOKS,
        payload: bookId
    }

}

export function retrieveAndSetBooks(userId){

    

    return function(dispatch) {

        const token = localStorage.getItem('fire_token')
        return getAllBooks(token, userId).then(res => res.json()).then(books => {
             dispatch(setBooks(books))
        }).catch(err => console.log(err))

    }

} 