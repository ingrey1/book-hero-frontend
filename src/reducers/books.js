import {SET_BOOKS, REMOVE_BOOK_FROM_ALL_BOOKS} from '../actions/types'


const initialState = []

export default function books(state=initialState, action) {
    switch (action.type) {

        case SET_BOOKS:
            return action.payload

        case REMOVE_BOOK_FROM_ALL_BOOKS:
            return state.filter(book => book.id !== action.payload)
                

        default: return state
    }
}
