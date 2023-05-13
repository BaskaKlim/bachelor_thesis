// auth.reducers.js
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../actions/types";

const initialState = {
  user: null,
  errors: null,
  loading: false,
  authToken: localStorage.getItem("authToken"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        errors: null,
        loading: false,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        errors: action.payload,
        loading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        errors: null,
        loading: false,
        authToken: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;

