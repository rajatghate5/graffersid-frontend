import { combineReducers } from "redux";
import { companyListReducer } from "./companyReducers";
import { reviewListReducer } from "./reviewReducers";

const rootReducer = combineReducers({
  companyList: companyListReducer,
  reviewList: reviewListReducer,
});

export default rootReducer;
