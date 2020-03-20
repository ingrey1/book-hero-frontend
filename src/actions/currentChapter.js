import {START_READER, END_READER,
     SET_CURRENT_CHAPTER,
      SET_NEXT_CHAPTER, 
      SET_PREVIOUS_CHAPTER,
      UPDATE_CHAPTER_LOCATION} from './types'
import {getCurrentChapter, getNextChapter, updateReadingStatus} from '../api/api'

function startReader() {
    return {
       type: START_READER
    }
}

function endReader() {
    return {
       type: END_READER
    }
}

function setCurrentChapter(chapter) {
    return {
        type: SET_CURRENT_CHAPTER,
        payload: chapter
    }
}

function retrieveCurrentChapter(userId, bookId) {
    
    const token = localStorage.getItem('fire_token')
    
    return function(dispatch) {
    
        getCurrentChapter(userId, bookId, token).then(res => res.json()).then(data => {
            if (!data.errors) { // all good, have chapter

                dispatch(setCurrentChapter(data))

            } else { // handle errors; display message to inform user couldnt retrieve current chapter

            }
        }).catch(err => console.log(err)) // handle errors 


    }
}


function setNextChapter(chapter) {

    return {
        type: SET_NEXT_CHAPTER,
        payload: chapter
    }
    
}

function setPreviousChapter(chapter) {
    return {
        type: SET_PREVIOUS_CHAPTER,
        payload: chapter
    }
}

function updateChapterLocation(chapter, newCurrentWord ) {
    return {
        type: UPDATE_CHAPTER_LOCATION,
        payload: {
            chapter: chapter,
            newCurrentWord: newCurrentWord
        }
    }
}