import {
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
} from "../actions/types";
  
  const initialState = {
    accounts: [],
    error: null,
  };
  
  const accountReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ACCOUNTS_SUCCESS:
        return {
          ...state,
          accounts: action.payload,
          error: null,
        };
      case FETCH_ACCOUNTS_FAILURE:
        return {
          ...state,
          accounts: [],
          error: action.payload,
        };
      case CREATE_ACCOUNT_SUCCESS:
        return {
          ...state,
          accounts: [...state.accounts, action.payload],
          error: null,
        };
      case CREATE_ACCOUNT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_ACCOUNT_SUCCESS:
        const updatedAccounts = state.accounts.map((account) =>
          account.id === action.payload.id ? action.payload : account
        );
        return {
          ...state,
          accounts: updatedAccounts,
          error: null,
        };
      case UPDATE_ACCOUNT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_ACCOUNT_SUCCESS:
        const filteredAccounts = state.accounts.filter(
          (account) => account.id !== action.payload
        );
        return {
          ...state,
          accounts: filteredAccounts,
          error: null,
        };
      case DELETE_ACCOUNT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default accountReducer;
  