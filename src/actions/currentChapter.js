import {START_READER, END_READER,
     SET_CURRENT_CHAPTER,
      SET_NEXT_CHAPTER, 
      SET_PREVIOUS_CHAPTER,
      UPDATE_CHAPTER_LOCATION, SET_TEXT_SIZE, CLEAR_CURRENT_CHAPTER, PREVIOUS_CHAPTER_TRANSITION, NEXT_CHAPTER_TRANSITION} from './types'
import {getCurrentChapter, getNextChapter, getPreviousChapter} from '../api/api'

export function startReader() {
    return {
       type: START_READER
    }
}

export function setTextSize(newSize) {
    return {
        type: SET_TEXT_SIZE,
        payload: newSize
    }
}

export const clearCurrentChapter = () => {
    return {
      type: CLEAR_CURRENT_CHAPTER
    }
  }

export function endReader() {
    return {
       type: END_READER
    }
}

export function setCurrentChapter(chapter) {
    return {
        type: SET_CURRENT_CHAPTER,
        payload: chapter
    }
}

export function retrieveCurrentChapter(userId, bookId) {
    
    const token = localStorage.getItem('fire_token')
    
    return async function(dispatch) {

         
        return getCurrentChapter(userId, bookId, token).then(res => res.json()).then(data => {
            if (!data.errors) { // all good, have chapter

                dispatch(setCurrentChapter(data))

            } else { // handle errors; display message to inform user couldnt retrieve current chapter

            }
        }).catch(err => console.log(err)) // handle errors 


    }
}


export function setNextChapter(chapter) {

    return {
        type: SET_NEXT_CHAPTER,
        payload: chapter
    }
    
}

export function retrieveNextChapter(userId, bookId) {
    
    const token = localStorage.getItem('fire_token')
    console.log("retrieve next chapter called")
    return async function(dispatch) {
        console.log("thunk for retrieveNextChapter dispatched")
        return getNextChapter(userId, bookId, token).then(res => res.json()).then(data => {
            if (!data.errors) { // all good, have chapter
                console.log("data from getNextChapter", data)
                dispatch(setNextChapter(data))

            } else { // handle errors; display message to inform user couldnt retrieve current chapter
                console.log("data.errors", data)
            }
        }).catch(err => console.log(err)) // handle errors 


    }
}

export function retrievePreviousChapter(userId, bookId) {
    
    const token = localStorage.getItem('fire_token')
    console.log("outside thunk for get prev chapter")
    return async function(dispatch) {
         console.log("thunk for get prev chapter")
         
        return getPreviousChapter(userId, bookId, token).then(res => res.json()).then(data => {
             console.log('getprevchapter')
            if (!data.errors && !data.complete) { // all good, have chapter

                dispatch(setPreviousChapter(data))

            } else { // handle errors; display message to inform user couldnt retrieve current chapter

            }
        }).catch(err => console.log(err)) // handle errors 


    }
}


export function setPreviousChapter(chapter) {
    return {
        type: SET_PREVIOUS_CHAPTER,
        payload: chapter
    }
}

export function updateChapterLocation(chapter, newCurrentWord ) {
    return {
        type: UPDATE_CHAPTER_LOCATION,
        payload: {
            chapter: chapter,
            newCurrentWord: newCurrentWord
        }
    }
}


export const previousChapterTransition = (currentChapter, prevChapter, newPrevChapter, max_char) => {

     console.log("previous chapter transition called")
    const newCurrentChapter = {
        ...prevChapter,
        current_word: prevChapter.content.length - max_char
    }

    const newNextChapter = {
        ...currentChapter,
        current_word: 1
    }

    return {
        type: PREVIOUS_CHAPTER_TRANSITION,
        payload: {
            currentChapter: newCurrentChapter,
            nextChapter: newNextChapter,
            previousChapter: newPrevChapter
        }
    }

}
 
export const nextChapterTransition = (currentChapter, nextChapter, max_characters) => {

    const newCurrentChapter = {...nextChapter,
                            current_word: 1}
    console.log("nextchaptertransition", nextChapter)
        
    const newNextChapter = {}

    const newPreviousChapter = {...currentChapter,
                                current_word: currentChapter.content.length - max_characters < 1 ? 1 : currentChapter.content.length - max_characters  }
    
    return {
        type: NEXT_CHAPTER_TRANSITION,
        payload: {
            currentChapter: newCurrentChapter,
            nextChapter: newNextChapter,
            previousChapter: newPreviousChapter
        }
    }                            

} 



