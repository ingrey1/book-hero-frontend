

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

export function satisfiesCategories (filterCategories, bookCategories) {
       for (filterCategory of filterCategories) {
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
         
        filteredArr = filteredArr.filter(e => e.categories.includes(categories))


      } else { // category and title filter 

        filteredArr = filteredArr.filter(e => e.categories.includes(categories) && e.title.startsWith(title) )

      }
    }
    console.log("filteredArr", filteredArr)
    return filteredArr;
}

