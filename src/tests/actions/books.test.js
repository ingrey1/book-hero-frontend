import {SET_BOOKS} from '../../actions/types'
import {setBooks} from '../../actions/books'


// export const setBooks = (books) => {
//     return {
//         type: SET_BOOKS,
//         payload: books
//     }
// }


describe('setBooks', () => {
    const books1 = [{id: 5, name: "a book"}, {id: 17, name: "another book"}]

    it('should return an object with type: SET_BOOKS key/value pair', () => {
          const expectedResult = {type: SET_BOOKS, payload: []}.type
          const actualResult = setBooks([]).type
          expect(actualResult).toEqual(expectedResult)  
    })
    
    it('should return object with payload key, value an array', () => {
        const expectedResult = {type: SET_BOOKS, payload: []}.payload
        const actualResult = setBooks([]).payload
        expect(typeof(actualResult)).toEqual(typeof(expectedResult))
    })


})