import {getBookByChapter } from '../utilities/helpers'

// export const getBookByChapter = (books, book_id) => {
  
//     const book = books.find(book => book.id === book_id)
//     return book
//  }
describe('getBookByChapter', () => {
    it('correct book from array with multiple books', () => {
        // characterize expected result
        // use function you're testing to get actual result
        // compare expected result and the actual result
        const book = {id: 7} 
        const books = [book, {id: 9}, {id: 42}]
        const bookId = 7
        const expectedResult = book
        const actualResult = getBookByChapter(books, bookId)
        expect(actualResult).toEqual(expectedResult)  
    })
})