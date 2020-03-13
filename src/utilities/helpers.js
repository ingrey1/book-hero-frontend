

export function constructLibraryListBook(book) {

    const newBook = {
        title: book.title,
        imageUrl: book.image_url,
        authors: book.author.name.split(";") 
    }

    console.log("new book", newBook)
    return newBook
}

export function constructLibraryDetailBook(book) {

}

