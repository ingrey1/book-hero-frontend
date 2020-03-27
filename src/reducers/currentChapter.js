import {START_READER, NEXT_CHAPTER_TRANSITION, END_READER, CLEAR_CURRENT_CHAPTER, SET_PREVIOUS_CHAPTER, SET_CURRENT_CHAPTER, SET_NEXT_CHAPTER, UPDATE_CHAPTER_LOCATION, PREVIOUS_CHAPTER_TRANSITION, SET_TEXT_SIZE} from '../actions/types'


const initialState = {

    currentChapter: {},
    nextChapter: {},
    previousChapter: {},
    readingMode: false,
    displayOptions: {
        textSize: 24    
    }
   
}

export default function currentChapter(state=initialState, action) {
    
    switch (action.type) {

        case SET_TEXT_SIZE:

            return {
                ...state,
                displayOptions: {
                    ...state.displayOptions,
                    textSize: action.payload
                }
            }

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


        case PREVIOUS_CHAPTER_TRANSITION:
            
            
                return {
                    
                    ...state,
                    currentChapter: action.payload.currentChapter,
                    nextChapter: action.payload.nextChapter,
                    previousChapter: action.payload.previousChapter
                }

        case NEXT_CHAPTER_TRANSITION:

            return {
                ...state,
                currentChapter: action.payload.currentChapter,
                nextChapter: action.payload.nextChapter,
                previousChapter: action.payload.previousChapter
            }

        default: return state

    }
}
