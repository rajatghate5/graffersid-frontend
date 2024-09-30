import axios from "axios";
import { API_URL } from "../constants";

export const fetchCompanies = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/get-companies`);
    dispatch({ type: "SET_COMPANIES", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const addCompany = (company) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/add-company`, company);
    dispatch({ type: "ADD_COMPANY", payload: data });
  } catch (error) {
    console.error(error);
  }
};
