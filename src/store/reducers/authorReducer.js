import {
  GET_AUTHOR_BY_UID,
  SET_ERROR_AUTHOR_BY_UID_TRUE
} from "../actions/types";

export const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AUTHOR_BY_UID:
      return {
        ...state,
        ...action.payload
      };
    case SET_ERROR_AUTHOR_BY_UID_TRUE:
      return {
        ...state,
        [action.payload.uid]: { error: true }
      };

    default:
      return state;
  }
}
