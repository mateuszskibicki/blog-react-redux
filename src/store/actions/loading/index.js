import { LOADING_DATA_START, LOADING_DATA_STOP } from "../types";

// Set loading to true
export const setLoadingStart = () => dispatch => {
  dispatch({ type: LOADING_DATA_START });
};

// Set loading to false
export const setLoadingStop = () => dispatch => {
  dispatch({ type: LOADING_DATA_STOP });
};
