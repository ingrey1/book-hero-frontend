import booksReducer from '../../reducers/books'
import {deepCopy} from 'fast-deep-copy'

// const initialState = []

// export default function books(state=initialState, action) {
//     switch (action.type) {

//         case SET_BOOKS:
//             return action.payload

//         case REMOVE_BOOK_FROM_ALL_BOOKS:
//             return state.filter(book => book.id !== action.payload)
                

//         default: return state
//     }
// }


describe('books reducer', () =>  {
     
    it('return value should be an array', () => {
        const expectedResult = typeof([])
        const inputAction = {type: 'SET_BOOKS', payload: []}
        const actualResult = typeof(booksReducer([], inputAction ))
        expect(actualResult).toEqual(expectedResult)
    })

    it('if given an action with invalid type, returns initialState', () => {
        const state = []
        const inputAction = {type: 'SET_BOOK', payload: [{id: 5}]}
        const actualResult = booksReducer(state, inputAction )
        const expectedResult = []
        expect(actualResult).toEqual(expectedResult)

    })

    it('CASE REMOVE_BOOK_FROM_ALL_BOOKS: remove correct book, and should not mutate original state', () => {
        const state = [{id: 1, title: "dogs of oz"}, {id: 3, title: "cats of zam"}]
        const copiedState = deepCopy(state)
        const actualResult  = booksReducer(state, {type: 'REMOVE_BOOK_FROM_ALL_BOOKS', payload: 1})
        const expectedResult = state.filter(book => book.id !== 1)
        // check for correct values in returned array
        expect(actualResult).toEqual(expectedResult)
        // check to see after reducer has been called, original state hasnt been mutated
        expect(state).toEqual(copiedState)
    })




})

// export default function books(state=initialState, action) {
//     switch (action.type) {

//         case SET_BOOKS:
//             return action.payload

//         case REMOVE_BOOK_FROM_ALL_BOOKS:
//             return state.filter(book => book.id !== action.payload)
                

//         default: return state
//     }
// }