import _ from 'underscore'
import {SET_USER_BOOKS,
     SET_SELECTED_LIBRARY_BOOK, SORT_USER_BOOKS, FILTER_USER_BOOKS} from '../actions/types'


const initialState = {
    userBooks: [],
    selectedBook: null, // this will be an id from userBooks
    displayOptions: {
        sort: {
            property: 'title',
            ascending: true
        },
        filter: null
    }
}

export default function library(state=initialState, action) {
    switch (action.type) {

        case SET_USER_BOOKS:
            
            return {
                ...state,
                userBooks: action.payload
            }

        case SET_SELECTED_LIBRARY_BOOK:

                return {
                    ...state,
                    selectedBook: action.payload
                }

        case SORT_USER_BOOKS:

            return {
                ...state,
                displayOptions: {
                    ...state.displayOptions,
                    sort: action.payload
                }
            }
        
        case FILTER_USER_BOOKS:

                return {
                    ...state,
                    displayOptions: {
                        ...state.displayOptions,
                        filter: action.payload
                    }
                }

        default: return state
    }
}
