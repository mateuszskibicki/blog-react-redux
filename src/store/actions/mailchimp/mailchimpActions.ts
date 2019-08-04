import { Dispatch } from "react";
import axios from "axios";
import {
  SUBSCRIBE_TO_MAILCHIMP,
  SET_LOADING_START_MAILCHIMP,
  SET_LOADING_STOP_MAILCHIMP,
  SET_MAILCHIMP_ERROR_TRUE,
  SET_MAILCHIMP_ERROR_FALSE
} from "../types";
import { validateEmail } from "../../../helpers/FormValidateHelpers";

// Set loading to true -> mailchimp
export const setLoadingMailchimpStart = () => (
  dispatch: Dispatch<{ type: string }>
) => {
  dispatch({ type: SET_LOADING_START_MAILCHIMP });
};

// Set loading to false -> mailchimp
export const setLoadingMailchimpStop = () => (
  dispatch: Dispatch<{ type: string }>
) => {
  dispatch({ type: SET_LOADING_STOP_MAILCHIMP });
};

// Set error to true -> mailchimp
export const setErrorMailchimpTrue = (message?: string) => (
  dispatch: Dispatch<{ type: string; payload: any }>
) => {
  dispatch({
    type: SET_MAILCHIMP_ERROR_TRUE,
    payload: { message: message || "" }
  });
};

// Set error to false -> mailchimp
export const setErrorMailchimpFalse = () => (
  dispatch: Dispatch<{ type: string }>
) => {
  dispatch({ type: SET_MAILCHIMP_ERROR_FALSE });
};

// Set success to true -> mailchimp
export const setSuccessMailchimpTrue = () => (
  dispatch: Dispatch<{ type: string }>
) => {
  dispatch({ type: SUBSCRIBE_TO_MAILCHIMP });
};

//subscribe to mailchimp main action
export const subscribeToMailchimp = (email_address: string) => async (
  dispatch: Dispatch<any>
) => {
  //set loading to false
  dispatch(setLoadingMailchimpStop());
  //set error to false
  dispatch(setErrorMailchimpFalse());

  //check if email is provided
  if (
    !email_address ||
    email_address.trim().length === 0 ||
    typeof email_address !== "string"
  ) {
    return dispatch(setErrorMailchimpTrue("Email is required."));
  }

  if (!validateEmail(email_address.trim())) {
    return dispatch(setErrorMailchimpTrue("Email is incorrect."));
  }

  //set loading to true
  dispatch(setLoadingMailchimpStart());

  const newMemberMailchimp = JSON.stringify({
    members: [
      {
        email_address,
        status: "subscribed"
      }
    ]
  });

  const response = await axios({
    method: "post",
    url: "https://us3.api.mailchimp.com/3.0/lists/4478287ff6",
    data: newMemberMailchimp,
    headers: {
      Authorization: `auth ${process.env.REACT_APP_MAILCHIMP_TOKEN}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });

  console.log(response);

  //set loading to true
  dispatch(setLoadingMailchimpStop());
  dispatch(setSuccessMailchimpTrue());
};
