import Prismic from "prismic-javascript";
import {
  GET_ALL_ARTICLES,
  SET_ERROR_ALL_ARTICLES_FALSE,
  SET_ERROR_ALL_ARTICLES_TRUE
} from "../types";
// loading
import { setLoadingStart, setLoadingStop } from "../common/loadingActions";
// helpers
import {
  articlesListHelper,
  allArticlesPageSEOHelper
} from "../../../helpers/articles/ArticlesHelpers";

// Set articles error to true
export const setArticlesErrorToTrue = () => dispatch => {
  dispatch({ type: SET_ERROR_ALL_ARTICLES_TRUE });
};

// Set articles error to false
export const setArticlesErrorToFalse = () => dispatch => {
  dispatch({ type: SET_ERROR_ALL_ARTICLES_FALSE });
};

// Get afticles data by page/tag/search_text/category from prismic CMS
export const getAllArticles = ({
  page = 1,
  category = null,
  searchText = null,
  SEO = null
}) => async dispatch => {
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

    //Empty data at the very beginning
    let data = null;
    let SEOdata = SEO || null;

    //Articles query
    if (!category && !searchText) {
      // all articles
      data = await getAllArticlesPrismicQuery({ prismicConnection, page });
    } else if (category && !searchText) {
      // all articles based on category
      data = await getAllArticlesByCategoryPrismicQuery({
        prismicConnection,
        page,
        category
      });
    } else if (!category && searchText) {
      // all articles based on searchText
      data = await getAllArticlesBySearchTextPrismicQuery({
        prismicConnection,
        page,
        searchText
      });
    } else if (category && searchText) {
      // all articles based on category and searchText
      data = await getAllArticlesByCategoryAndSearchTextPrismicQuery({
        prismicConnection,
        page,
        category,
        searchText
      });
    }

    //Check if SEO already exists, if no grab it from the prismic
    if (!SEOdata) {
      SEOdata = await getAllArticlesSEOPrismicQuery({ prismicConnection });
      SEOdata = allArticlesPageSEOHelper(SEOdata);
    }

    //If there is no articles data -> put error true and stop loading
    if (!data) {
      dispatch(setArticlesErrorToTrue());
      return dispatch(setLoadingStop());
    }

    //Sanitize data
    const articlesData = articlesListHelper(data);

    //Dispatch data to the reducer
    dispatch({
      type: GET_ALL_ARTICLES,
      payload: {
        articlesData,
        page,
        totalPages: data.total_pages,
        category,
        searchText,
        SEO: SEOdata
      }
    });

    //Set loading to false
    dispatch(setLoadingStop());
  } catch (err) {
    //If error return like there is no data and stop loading
    console.log("ERROR CATCH GET_ALL_ARTICLES");
    dispatch(setArticlesErrorToTrue());
    dispatch(setLoadingStop());
  }
};

export const queryCommonPart = {
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
    "single-article.xs_img",
    "single-article.author"
  ],
  fetchLinks: [
    "author.uid",
    "author.full_name",
    "author.short_description",
    "author.image_avatar"
  ]
};

export const getAllArticlesPrismicQuery = async ({
  prismicConnection,
  page
}) => {
  return await prismicConnection.query(
    Prismic.Predicates.at("document.type", "single-article"),
    {
      page,
      ...queryCommonPart
    }
  );
};

export const getAllArticlesByCategoryPrismicQuery = async ({
  prismicConnection,
  page,
  category
}) => {
  return await prismicConnection.query(
    [
      Prismic.Predicates.at("document.type", "single-article"),
      Prismic.Predicates.fulltext("my.single-article.categories", category)
    ],
    {
      page,
      ...queryCommonPart
    }
  );
};

export const getAllArticlesBySearchTextPrismicQuery = async ({
  prismicConnection,
  page,
  searchText
}) => {
  return await prismicConnection.query(
    [
      Prismic.Predicates.at("document.type", "single-article"),
      Prismic.Predicates.fulltext("document", searchText)
    ],
    {
      page,
      ...queryCommonPart
    }
  );
};

export const getAllArticlesByCategoryAndSearchTextPrismicQuery = async ({
  prismicConnection,
  page,
  category,
  searchText
}) => {
  return await prismicConnection.query(
    [
      Prismic.Predicates.at("document.type", "single-article"),
      Prismic.Predicates.fulltext("my.single-article.categories", category),
      Prismic.Predicates.fulltext("document", searchText)
    ],
    {
      page,
      ...queryCommonPart
    }
  );
};

export const getAllArticlesSEOPrismicQuery = async ({ prismicConnection }) => {
  return await prismicConnection.query(
    Prismic.Predicates.at("document.type", "all-articles-seo")
  );
};
