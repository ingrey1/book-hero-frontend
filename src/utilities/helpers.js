import React from 'react'
import {Dropdown} from 'react-bootstrap'
import _ from 'underscore'

export function constructLibraryListBook(book) {

    
    const newBook = {
        id: book.id,
        title: book.title,
        imageUrl: book.image_url,
        authors: book.author.name.split(";"),
        categories: book.categories.split(";"),
        last_read: Date.parse(book.current_reading_location.updated_at),
        last_added_to_library: Date.parse(book.current_reading_location.created_at)   
    }

    
    return newBook
}



export function constructLibraryDetailBook(book) {

}

export function satisfiesCategories(filterCategories, bookCategories) {
       for (let filterCategory of filterCategories) {
         if (!bookCategories.includes(filterCategory)) return false 
       }
       return true // all filter categories are satisfied by the book's categories
}

export function doubleFilterByTitleAndCategory(arr, title, categories) {

    let filteredArr = arr;

    if (categories === 'all' && title !== '') { // filter by title only
         
         filteredArr = filteredArr.filter(e => e.title.startsWith(title))
    
    } else {
      if (title === '') { // just category filter
         
        filteredArr = filteredArr.filter(e => satisfiesCategories(categories, e.categories))


      } else { // category and title filter 

        filteredArr = filteredArr.filter(e => satisfiesCategories(categories, e.categories) && e.title.startsWith(title) )

      }
    }
    console.log("filteredArr", filteredArr)
    return filteredArr;
}

export const getAllCategories = (books) => {
   return _.uniq(books.map(book => {
     return book.categories.split(";")
   }).flat())
}

export const createBootstrapDropDownItems = (elements) => {
    return elements.map(e => {
       return <Dropdown.Item key={Math.random()} as="button" eventKey={e}>{e}</Dropdown.Item>
    })
}

export const mapSortPropertyToSortLabel = (sortProperty) => {
    if (sortProperty === 'last_read') return 'Last Read Date'
    else if (sortProperty === 'last_added_to_library') return 'Add To Library Date'
    else return 'Title'
}

export const getBookByChapter = (books, book_id) => {
  
   const book = books.find(book => book.id === book_id)
   return book
}

export const calculatePercentOfChapterForCurrentPage = (chapterContent, lastCharOnPageIndex) => {
    return Math.round(1.0 * lastCharOnPageIndex / chapterContent.length * 100) 
}

