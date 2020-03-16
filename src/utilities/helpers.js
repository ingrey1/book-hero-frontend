import React from 'react'
import {Dropdown} from 'react-bootstrap'
import _ from 'underscore'

export function constructLibraryListBook(book) {

    const newBook = {
        title: book.title,
        imageUrl: book.image_url,
        authors: book.author.name.split(";"),
        categories: book.categories.split(";") 
    }

    console.log("new book", newBook)
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

