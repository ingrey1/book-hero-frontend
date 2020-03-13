

export function constructLibraryListBook(book) {

    return {
        title: book.title,
        imageUrl: book.image_url,
        authors: book.author.split(";") 
    }

}

export function constructLibraryDetailBook(book) {

}

