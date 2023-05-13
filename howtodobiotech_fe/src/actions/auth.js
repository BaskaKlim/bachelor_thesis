// auth.actions.js
import authService from "../service/Auth.servise";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./types";

export const register = (userData) => {
  return async (dispatch) => {
    try {
      // Implementácia registrácie pomocou authService
      await authService.register(userData);
      dispatch({ type: REGISTER_SUCCESS });
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error.message });
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await authService.login(credentials);
      const authToken = response.data.token;
      localStorage.setItem("authToken", authToken);
      dispatch({ type: LOGIN_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await authService.logout();
      localStorage.removeItem("authToken");
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAILURE, payload: error.message });
    }
  };
};
