import { combineReducers } from "redux";
import {auth} from './auth'
import {books} from './books'
import {comments} from './comments'
import {currentChapter} from './currentChapter'







export default combineReducers({
    currentChapter: chapterReducer,   
    books: booksReducer,
    comments: commentsReducer,
    auth: authReducer,
    profile: profileReducer

})