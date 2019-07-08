import {
  GET_ARTICLE_BY_UID,
  GET_3_LAST_ARTICLES,
  SET_ERROR_SINGLE_ARTICLE_TRUE,
  SET_CURRENT_ARTICLE_UID
} from "../actions/types";

export const initialState = {
  currentArticleUID: null,
  lastArticles: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR_SINGLE_ARTICLE_TRUE:
      return {
        ...state,
        [action.payload.articleUID]: { error: true }
      };
    case SET_CURRENT_ARTICLE_UID:
      return {
        ...state,
        currentArticleUID: action.payload.articleUID
      };
    case GET_3_LAST_ARTICLES:
      return {
        ...state,
        lastArticles: action.payload.lastArticles
      };
    case GET_ARTICLE_BY_UID:
      return {
        ...state,
        error: false,
        currentArticleUID: action.payload.articleUID,
        [action.payload.articleUID]: action.payload.articleData
      };
    default:
      return state;
  }
}
