import AccountService from "../service/Account.service";

import {
    FETCH_ACCOUNTS_SUCCESS,
    FETCH_ACCOUNTS_FAILURE,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAILURE,
    UPDATE_ACCOUNT_SUCCESS,
    UPDATE_ACCOUNT_FAILURE,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAILURE,
  } from "./types";
export const fetchAccounts = () => {
  return (dispatch) => {
    return AccountService.getAllAccounts()
      .then((response) => {
        dispatch(fetchAccountsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchAccountsFailure(error));
      });
  };
};

export const createAccount = (account) => {
  return (dispatch) => {
    return AccountService.createAccount(account)
      .then((response) => {
        dispatch(createAccountSuccess(response.data));
      })
      .catch((error) => {
        dispatch(createAccountFailure(error));
      });
  };
};

export const updateAccount = (id, data) => async (dispatch) => {
  try {
    const res = await AccountService.updateAccount(id, data);
    console.log("Updating account:", id, data); 
    dispatch({
      type: UPDATE_ACCOUNT_SUCCESS,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteAccount = (id) => {
  return (dispatch) => {
    return AccountService.deleteAccount(id)
      .then(() => {
        dispatch(deleteAccountSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteAccountFailure(error));
      });
  };
};

export const fetchAccountsSuccess = (accounts) => {
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    payload: accounts,
  };
};

export const fetchAccountsFailure = (error) => {
  return {
    type: FETCH_ACCOUNTS_FAILURE,
    payload: error,
  };
};

export const createAccountSuccess = (account) => {
  return {
    type: CREATE_ACCOUNT_SUCCESS,
    payload: account,
  };
};

export const createAccountFailure = (error) => {
  return {
    type: CREATE_ACCOUNT_FAILURE,
    payload: error,
  };
};

export const updateAccountSuccess = (account) => {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    payload: account,
  };
};

export const updateAccountFailure = (error) => {
  return {
    type: UPDATE_ACCOUNT_FAILURE,
    payload: error,
  };
};

export const deleteAccountSuccess = (id) => {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
    payload: id,
  };
};

export const deleteAccountFailure = (error) => {
  return {
    type: DELETE_ACCOUNT_FAILURE,
    payload: error,
  };
};
