
const baseUrl = "http://localhost:3000/api/v1"

function createAuthHeader(token) {
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

// rails book hero api methods

export const getAllBooks = (token, userId) => {

    const url = `${baseUrl}/users/${userId}/books`
    console.log(url)
    const configuration = {
        method: "GET",
        headers: createAuthHeader(token)
    }

    return fetch(url, configuration)
    
}

export const addBook = (token, userId, bookId) => {

    const url = `${baseUrl}/users/${userId}/add_book/${bookId}`
    console.log(url)
    const configuration = {
        method: "POST",
        headers: createAuthHeader(token)
    }

    return fetch(url, configuration)

}

export const getComments = (token, userId, bookId, chapterId) => {


    
    const url = `${baseUrl}/users/${userId}/books/${bookId}/chapters/${chapterId}/comments`
    console.log(url)
    const configuration = {
        method: "GET",
        headers: createAuthHeader(token)
    }

    return fetch(url, configuration)
}

export const createComment = (token, userId, bookId, chapterId, content) => {
    
    const url = `${baseUrl}/users/${userId}/books/${bookId}/chapters/${chapterId}/comments`
    console.log("url", url)
    const configuration = {
        method: "POST",
        headers: createAuthHeader(token),
        body: JSON.stringify({content: content})
    }

    return fetch(url, configuration)
}

export const deleteComment = (token, userId, bookId, chapterId, commentId) => {
    
    const url = `${baseUrl}/users${userId}/books/${bookId}/chapters/${chapterId}/comments`
    const configuration = {
        method: "DELETE",
        headers: createAuthHeader(token)
    }

    return fetch(url, configuration)
}



export function authenticateUser(token) {

    const url = `${baseUrl}/auth`
    const configuration = {
        method: "POST",
        headers: createAuthHeader(token)
    }

    return fetch(url, configuration)

}

export function updateUser(userId, token, info) {
    const url = `${baseUrl}/users/${userId}`
    const configuration = {
        method: "PATCH",
        headers: createAuthHeader(token),
        body: JSON.stringify(info)
    }
    return fetch(url, configuration)
}

export function getUserBooks(userId, token) {
   const url = baseUrl + `/users/${userId}/books?my_library=true`
   const configuration = {
    method: "GET",
    headers: createAuthHeader(token)
    }
    return fetch(url, configuration)

}

export function getPreviousChapter(userId, bookId, token) {
    console.log("get previous chapter called")
    const url = baseUrl + `/users/${userId}/books/${bookId}/chapters/-1?chapter_designation=previous`
    const configuration = {
        method: 'GET',
        headers: createAuthHeader(token)
    }
    return fetch(url, configuration)
}

export function getCurrentChapter(userId, bookId, token) {

    const url = baseUrl + `/users/${userId}/books/${bookId}/chapters/-1?chapter_designation=current`
    const configuration = {
        method: 'GET',
        headers: createAuthHeader(token)
    }
    return fetch(url, configuration)

}

export function getNextChapter(userId, bookId, token) {

    const url = baseUrl + `/users/${userId}/books/${bookId}/chapters/-1?chapter_designation=next`
    const configuration = {
        method: 'GET',
        headers: createAuthHeader(token)
    }
    return fetch(url, configuration)

}

export function updateReadingStatus(userId, bookId, token, newCurrentWord, newCurrentChapter) {
    console.log("update reading status called")
    const url = baseUrl + `/users/${userId}/books/${bookId}/chapters/update_reading_status`
    const configuration = {
        method: 'POST',
        headers: createAuthHeader(token),
        body: JSON.stringify({
            current_chapter: newCurrentChapter,
            current_word: newCurrentWord
        })
    }
    return fetch(url, configuration)

}


