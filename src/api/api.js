
const baseUrl = "http://localhost:3000/api/v1"

function createAuthHeader(token) {
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

// rails book hero api methods

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
   const url = baseUrl + `/users/${userId}/books`
   const configuration = {
    method: "GET",
    headers: createAuthHeader(token)
    }
    return fetch(url, configuration)

}

export function getPreviousChapter(userId, bookId, token) {
    const url = baseUrl + `/users/${userId}/books/${bookId}/chapters/previous_chapter`
    const configuration = {
        method: 'GET',
        headers: createAuthHeader(token)
    }
    return fetch(url, configuration)
}

export function getCurrentChapter(userId, bookId, token) {

    const url = baseUrl + `/users/${userId}/books/${bookId}/chapters/current_chapter`
    const configuration = {
        method: 'GET',
        headers: createAuthHeader(token)
    }
    return fetch(url, configuration)

}

export function getNextChapter(userId, bookId, token) {

    const url = baseUrl + `/users/${userId}/books/${bookId}/chapters/next_chapter`
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


