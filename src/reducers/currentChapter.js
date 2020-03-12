import {START_READER, END_READER, SET_PREVIOUS_CHAPTER, SET_CURRENT_CHAPTER, SET_NEXT_CHAPTER} from '../actions/types'


const initialState = {

    currentChapter: {text: [], currentWordNum: null},
    nextChapter: {text: [], currentWordNum: null},
    prevChapter: {text: [], currentWordNum: null},
    readingMode: false
   
}

export default function currentChapter(state=initialState, action) {
    
    switch (action.type) {

        case START_READER:

            return {
                ...state,
                readingMode: true
            }

        case END_READER:

                return {
                    ...state,
                    readingMode: true
                }

        case SET_CURRENT_CHAPTER:

           return {...state,
                   currentChapter: action.payload.chapter
                   }


        case SET_PREVIOUS_CHAPTER:

                return {...state,
                    previousChapter: action.payload.chapter
                    }



        case SET_NEXT_CHAPTER:

                return {...state,
                    nextChapter: action.payload.chapter
                    }



        default: return state

    }
}
