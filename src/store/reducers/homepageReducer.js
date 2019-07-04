import { GET_HOMEPAGE_DATA_PRISMIC } from "../actions/types";

export const initialState = {
  data: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HOMEPAGE_DATA_PRISMIC:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
