import authService from "../../../service/Auth.service";
import { REGISTER_SUCCESS, REGISTER_FAILURE } from "./types";

export const register = (userData) => {
  return async (dispatch) => {
    try {
      await authService.register(userData);
      dispatch({ type: REGISTER_SUCCESS });
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error.message });
    }
  };
};
