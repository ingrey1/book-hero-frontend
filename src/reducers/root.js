import { combineReducers } from "redux";
import auth from "./auth";
import books from "./books";
import comments from "./comments";
import currentChapter from "./currentChapter";
import profile from "./profile";
import library from "./library";
import browse from "./browse";

export default combineReducers({
  currentChapter: currentChapter,
  books: books,
  comments: comments,
  auth: auth,
  profile: profile,
  library: library,
  browse: browse
});
