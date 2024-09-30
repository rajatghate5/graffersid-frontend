import axios from "axios";
import { API_URL } from "../constants";

export const SET_REVIEWS = "SET_REVIEWS";
export const ADD_REVIEW = "ADD_REVIEW";
export const FETCH_REVIEWS_REQUEST = "FETCH_REVIEWS_REQUEST";
export const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";
export const FETCH_REVIEWS_FAILURE = "FETCH_REVIEWS_FAILURE";

export const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  payload: reviews,
});

export const addReview = (company) => async (dispatch) => {
  try {
    const { id, ...reviewDetails } = company;
    const { data } = await axios.post(
      `${API_URL}/add-review/${id}`,
      reviewDetails
    );
    dispatch({ type: "ADD_REVIEW", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const fetchReviews = (companyId) => async (dispatch) => {
  dispatch({ type: FETCH_REVIEWS_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/get-review/${companyId}`);
    dispatch(setReviews(response.data));
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};
