import _ from 'underscore'
import {
     SET_USER_LIBRARY,
     SEARCH_AND_FILTER_LIBRARY,
     SET_SELECTED_LIBRARY_BOOK,
     SET_SORT_USER_BOOKS_VALUE,
     SET_FILTER_USER_BOOKS_VALUE,
     UPDATE_LIBRARY_RETRIEVAL_ERRORS} from '../actions/types'


const initialState = {
    userBooks: [],
    selectedBook: null, // this will be an id from userBooks
    displayOptions: {
        sort: {
            property: 'title',
            ascending: true
        },
        filter: {
            categories: [],
            titleSearch: ''
        }
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

        case SET_SORT_USER_BOOKS_VALUE:

            return {
                ...state,
                displayOptions: {
                    ...state.displayOptions,
                    sort: action.payload
                }
            }
        
        case SET_FILTER_USER_BOOKS_VALUE:

                return {
                    ...state,
                    displayOptions: {
                        ...state.displayOptions,
                        filter: {
                            ...state.displayOptions.filter,
                            categories: action.payload.length === 0 ? [] : action.payload
                        }
                    }
                }

        case SEARCH_AND_FILTER_LIBRARY:

            return {
                 ...state,
                 displayOptions: {
                     ...state.displayOptions,
                     filter: {
                         ...state.displayOptions.filter,
                         titleSearch: action.payload
                     }
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
