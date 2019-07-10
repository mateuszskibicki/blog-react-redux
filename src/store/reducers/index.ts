import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import homepageReducer from "./homepageReducer";
import authorReducer from "./authorReducer";
import articlesReducer from "./articlesReducer";
import articleSingleReducer from "./articleSingleReducer";
import searchReducer from "./searchReducer";

export default combineReducers<object>({
  loading: loadingReducer,
  homepage: homepageReducer,
  authors: authorReducer,
  articles: articlesReducer,
  article: articleSingleReducer,
  search: searchReducer
});
