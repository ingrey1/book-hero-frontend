import {START_READER, END_READER, CLEAR_CURRENT_CHAPTER, SET_PREVIOUS_CHAPTER, SET_CURRENT_CHAPTER, SET_NEXT_CHAPTER, UPDATE_CHAPTER_LOCATION} from '../actions/types'


const initialState = {

    currentChapter: {},
    nextChapter: {},
    prevChapter: {},
    readingMode: false
   
}

export default function currentChapter(state=initialState, action) {
    
    switch (action.type) {

        case CLEAR_CURRENT_CHAPTER:

            return initialState

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
                   currentChapter: action.payload
                   }


        case SET_PREVIOUS_CHAPTER:

                return {...state,
                    previousChapter: action.payload
                    }



        case SET_NEXT_CHAPTER:

                return {...state,
                    nextChapter: action.payload
                    }

        case UPDATE_CHAPTER_LOCATION:

              return {
                  ...state,
                  [action.payload.chapter]: {
                      ...state[action.payload.chapter],
                      current_word: action.payload.newCurrentWord
                  }
              }

        default: return state

    }
}
