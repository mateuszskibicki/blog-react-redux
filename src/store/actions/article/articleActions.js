import Prismic from "prismic-javascript";
import {
  GET_ARTICLE_BY_UID,
  GET_3_LAST_ARTICLES,
  SET_ERROR_SINGLE_ARTICLE_TRUE,
  SET_ERROR_SINGLE_ARTICLE_FALSE,
  SET_CURRENT_ARTICLE_UID
} from "../types";
// loading
import { setLoadingStart, setLoadingStop } from "../common/loadingActions";
// helpers
import { singleArticleHelper } from "../../../helpers/article/ArticleHelpers";
import { articlesListHelper } from "../../../helpers/articles/ArticlesHelpers";

// Set single article error to true
export const setSingleArticleErrorToTrue = () => dispatch => {
  dispatch({ type: SET_ERROR_SINGLE_ARTICLE_TRUE });
};

// Set single article error to false
export const setSingleArticleErrorToFalse = () => dispatch => {
  dispatch({ type: SET_ERROR_SINGLE_ARTICLE_FALSE });
};

// Set single article current UID (when it exists and we're not calling anything)
export const setCurrentArticleUID = ({ articleUID }) => dispatch => {
  dispatch({ type: SET_CURRENT_ARTICLE_UID, payload: { articleUID } });
};

// Get afticles data by page/tag/search_text/category from prismic CMS
export const getArticleByUID = ({
  articleUID,
  lastArticles
}) => async dispatch => {
  try {
    // Start loading
    dispatch(setLoadingStart());

    //Prismic connection
    const prismicConnection = await Prismic.getApi(
      process.env.REACT_APP_PRISMIC_API_ENDPOINT,
      {
        accessToken: process.env.REACT_APP_PRISMIC_API_TOKEN
      }
    );

    //Article query
    const data = await getSingleArticleByUIDPrismicQuery({
      prismicConnection,
      articleUID
    });

    //If there is no articles data -> put error true and stop loading
    if (!data) {
      dispatch(setSingleArticleErrorToTrue());
      return dispatch(setLoadingStop());
    }

    //Last articles data
    let lastArticlesData = lastArticles;
    //If there is no last 3 articles in redux state --> lastArticles
    if (!lastArticlesData) {
      lastArticlesData = await getLast3ArticlesPrismicQuery({
        prismicConnection
      });
      dispatch({
        type: GET_3_LAST_ARTICLES,
        payload: {
          lastArticles: articlesListHelper(lastArticlesData)
        }
      });
    }

    //Sanitize data
    const articleData = singleArticleHelper(data);

    //Dispatch data to the reducer
    dispatch({
      type: GET_ARTICLE_BY_UID,
      payload: {
        articleData,
        articleUID,
        lastArticles: lastArticlesData
      }
    });

    //Set loading to false
    dispatch(setLoadingStop());
  } catch (err) {
    //If error return like there is no data and stop loading
    console.log("ERROR CATCH GET_ARTICLE_BY_UID");
    dispatch(setSingleArticleErrorToTrue());
    dispatch(setLoadingStop());
  }
};

export const getSingleArticleByUIDPrismicQuery = async ({
  prismicConnection,
  articleUID
}) => {
  return await prismicConnection.getByUID("single-article", articleUID, {
    fetchLinks: [
      "author.uid",
      "author.full_name",
      "author.short_description",
      "author.image_avatar"
    ]
  });
};

export const getLast3ArticlesPrismicQuery = async ({ prismicConnection }) => {
  return await prismicConnection.query(
    Prismic.Predicates.at("document.type", "single-article"),
    {
      pageSize: 3,
      orderings: "[my.single-article.date desc]",
      fetch: [
        "single-article.uid",
        "single-article.title",
        "single-article.short_description",
        "single-article.series",
        "single-article.categories",
        "single-article.tags",
        "single-article.date",
        "single-article.small_img",
        "single-article.author"
      ],
      fetchLinks: [
        "author.uid",
        "author.full_name",
        "author.short_description",
        "author.image_avatar"
      ]
    }
  );
};
