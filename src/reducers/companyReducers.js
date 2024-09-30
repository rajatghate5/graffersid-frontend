const initialState = {
  companies: [],
};

export const companyListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COMPANIES":
      return { ...state, companies: action.payload };
    case "ADD_COMPANY":
      return { ...state, companies: [...state.companies, action.payload] };
    default:
      return state;
  }
};
