import {START_READER, END_READER,
     SET_CURRENT_CHAPTER,
      SET_NEXT_CHAPTER, 
      SET_PREVIOUS_CHAPTER,
      UPDATE_CHAPTER_LOCATION} from './types'

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