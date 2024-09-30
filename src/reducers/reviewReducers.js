const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

export const reviewListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REVIEWS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SET_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
        loading: false,
      };
    case "ADD_REVIEW":
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case "FETCH_REVIEWS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
