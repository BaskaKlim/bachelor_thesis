import { REGISTER_SUCCESS, REGISTER_FAILURE } from "./types";

const initialState = {
  user: null,
  errors: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        errors: null,
        loading: false,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        errors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
