import axios from "axios";
const apiUrl = "http://localhost:8000/api";
const secretKey = "baloch123";
// console.log("API_URL:", process.env);
// console.log("JWT_SECRET_KEY:", process.env);
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${secretKey}`,
};
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, credentials, {
        headers,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };
};

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/auth/register", userData);
      dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.response.data });
    }
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("auth/password/email", { email });
      dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "FORGOT_PASSWORD_FAILURE",
        payload: error.response.data,
      });
    }
  };
};
