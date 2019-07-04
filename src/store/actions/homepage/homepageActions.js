//import axios from "axios";
import Prismic from "prismic-javascript";
import { GET_HOMEPAGE_DATA_PRISMIC } from "../types";
// loading
import { setLoadingStart, setLoadingStop } from "../common/loadingActions";

// Get homepage data from prismic CMS
export const getHomepageDataPrismic = () => async dispatch => {
  dispatch(setLoadingStart());
  const prismicConnection = await Prismic.getApi(
    process.env.REACT_APP_PRISMIC_API_ENDPOIT,
    {
      accessToken: process.env.REACT_APP_PRISMIC_API_TOKEN
    }
  );
  const data = await prismicConnection.getByUID("single-article", "article");
  dispatch({ type: GET_HOMEPAGE_DATA_PRISMIC, payload: data });
  dispatch(setLoadingStop());
};
