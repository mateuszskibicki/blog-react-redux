import Prismic from "prismic-javascript";
import { GET_AUTHOR_BY_UID, SET_ERROR_AUTHOR_BY_UID_TRUE } from "../types";
// loading
import { setLoadingStart, setLoadingStop } from "../common/loadingActions";
// helpers
import { authorPageHelper } from "../../../helpers/author/AuthorPageHelpers";
import { articlesListHelper } from "../../../helpers/articles/ArticlesHelpers";

// Get author data by UID from prismic CMS
export const getAuthorByUidPrismic = uid => async dispatch => {
  try {
    // Start loading
    dispatch(setLoadingStart());

    //Prismic connection
    const prismicConnection = await Prismic.getApi(
      process.env.REACT_APP_PRISMIC_API_ENDPOIT,
      {
        accessToken: process.env.REACT_APP_PRISMIC_API_TOKEN
      }
    );

    //Get author by uid from URL query
    const data = await prismicConnection.getByUID("author", uid);

    //If there is no author return payload null and stop loading
    if (!data) {
      dispatch({ type: SET_ERROR_AUTHOR_BY_UID_TRUE, payload: { uid } });
      dispatch(setLoadingStop());
      return;
    }

    //If there is author use helper to sanitize data
    const authorData = authorPageHelper(data);
    const userId = authorData[uid].author.id;

    //Get related articles
    const connectedArticles = await getRelatedToAuthorArticles({
      prismicConnection,
      userId
    });

    //If there is no article related to this author
    if (!connectedArticles.results || connectedArticles.results.length === 0) {
      authorData[uid].articles = null;
      dispatch({ type: GET_AUTHOR_BY_UID, payload: authorData });
      dispatch(setLoadingStop());
      return;
    }

    //If there is at least 1 article, add minified array to authorData object
    authorData[uid].articles = articlesListHelper(connectedArticles);

    // Dispatch object and at the very end set loading to false
    dispatch({
      type: GET_AUTHOR_BY_UID,
      payload: authorData
    });
    dispatch(setLoadingStop());
  } catch (err) {
    //If error return like there is no data and stop loading
    console.log("ERROR CATCH GET_AUTHOR_BY_UID");
    dispatch(setLoadingStop());
  }
};

export const getRelatedToAuthorArticles = async ({
  prismicConnection,
  userId
}) => {
  try {
    const connectedArticles = await prismicConnection.query(
      [
        Prismic.Predicates.at("document.type", "single-article"),
        Prismic.Predicates.at("my.single-article.author", userId)
      ],
      {
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

    return connectedArticles;
  } catch (err) {
    console.log("ERROR CATCH GET_AUTHOR_BY_UID -> related articles");
    throw new Error("ERROR CATCH GET_AUTHOR_BY_UID -> related articles");
  }
};
