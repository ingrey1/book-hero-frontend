import _ from 'underscore'
import {SET_USER_BOOKS,
     SET_SELECTED_LIBRARY_BOOK, SORT_USER_BOOKS, FILTER_USER_BOOKS} from '../actions/types'


const initialState = {
    userBooks: [],
    selectedBook: null,
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
            
            return state

         

        default: return state
    }
}
