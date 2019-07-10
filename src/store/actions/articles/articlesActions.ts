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
import { Dispatch } from "react";

import { ISEO, IPrismicConnection } from "../../../types";

// Set articles error to true
export const setArticlesErrorToTrue = () => (
  dispatch: Dispatch<{ type: string }>
) => {
  dispatch({ type: SET_ERROR_ALL_ARTICLES_TRUE });
};

// Set articles error to false
export const setArticlesErrorToFalse = () => (
  dispatch: Dispatch<{ type: string }>
) => {
  dispatch({ type: SET_ERROR_ALL_ARTICLES_FALSE });
};

// Get afticles data by page/tag/search_text/category from prismic CMS
export const getAllArticles = ({
  page = 1,
  category = null,
  searchText = null,
  SEO = null
}) => async (dispatch: any) => {
  try {
    // Start loading
    dispatch(setLoadingStart());

    //Prismic connection
    const PrismicEndpoint: string | null =
      process.env.REACT_APP_PRISMIC_API_ENDPOINT || null;
    const PrismicToken: string | null =
      process.env.REACT_APP_PRISMIC_API_TOKEN || null;

    //If no settings -> return error
    if (!PrismicEndpoint || !PrismicToken) {
      dispatch({ type: SET_ERROR_ALL_ARTICLES_TRUE });
      dispatch(setLoadingStop());
      return;
    }

    const prismicConnection = await Prismic.getApi(PrismicEndpoint, {
      accessToken: PrismicToken
    });

    //Empty data at the very beginning
    let data: null | any = null;
    let SEOdata: null | ISEO = SEO || null;

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

export const getAllArticlesPrismicQuery = async (args: {
  prismicConnection: IPrismicConnection;
  page: string | number;
}) => {
  const { prismicConnection, page } = args;

  return await prismicConnection.query(
    Prismic.Predicates.at("document.type", "single-article"),
    {
      page,
      ...queryCommonPart
    }
  );
};

export const getAllArticlesByCategoryPrismicQuery = async (args: {
  prismicConnection: IPrismicConnection;
  page: string | number;
  category: string | null;
}) => {
  const { prismicConnection, page, category } = args;

  // if missing data at least last articles
  if (!category)
    return await getAllArticlesPrismicQuery({ prismicConnection, page });

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

export const getAllArticlesBySearchTextPrismicQuery = async (args: {
  prismicConnection: IPrismicConnection;
  page: string | number;
  searchText: string | null;
}) => {
  const { prismicConnection, page, searchText } = args;

  // if missing data at least last articles
  if (!searchText)
    return await getAllArticlesPrismicQuery({ prismicConnection, page });

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

export const getAllArticlesByCategoryAndSearchTextPrismicQuery = async (args: {
  prismicConnection: IPrismicConnection;
  page: string | number;
  category: string | null;
  searchText: string | null;
}) => {
  const { prismicConnection, page, category, searchText } = args;

  // if missing data at least last articles
  if (!category || !searchText)
    return await getAllArticlesPrismicQuery({ prismicConnection, page });

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

export const getAllArticlesSEOPrismicQuery = async (args: {
  prismicConnection: IPrismicConnection;
}) => {
  const { prismicConnection } = args;
  return await prismicConnection.query(
    Prismic.Predicates.at("document.type", "all-articles-seo")
  );
};
