import _ from 'underscore'
import {SET_USER_LIBRARY,
     SET_SELECTED_LIBRARY_BOOK,
      SORT_USER_BOOKS,
     FILTER_USER_BOOKS,
     UPDATE_LIBRARY_RETRIEVAL_ERRORS} from '../actions/types'


const initialState = {
    userBooks: [],
    selectedBook: null, // this will be an id from userBooks
    displayOptions: {
        sort: {
            property: 'title',
            ascending: true
        },
        filter: null
    },
    errors: []
}

export default function library(state=initialState, action) {
    switch (action.type) {

        case SET_USER_LIBRARY:
            
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

        case UPDATE_LIBRARY_RETRIEVAL_ERRORS:

            return {
                ...state,
                errors: action.payload
            }

        default: return state
    }
}
