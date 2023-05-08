import {
    CREATE_STARTUP_OPT,
    RETRIEVE_STARTUP_OPTS,
    UPDATE_STARTUP_OPT,
    DELETE_STARTUP_OPT,
  } from "./types";
  
  import StartupOptDataService from "../service/Startup.service";
  export const createStartupOpt = (
    title,
    provider,
    description,
    startDate,
    endDate,
    website,
    countries,
    categories,
    supportCategories
  ) => async (dispatch) => {
    try {
      const res = await StartupOptDataService.createStartupOpt({
        title,
        provider,
        description,
        startDate,
        endDate,
        website,
        countries,
        categories,
        supportCategories,
      });
  
      dispatch({
        type: CREATE_STARTUP_OPT,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const getAllStartupOpts = () => async (dispatch) => {
    try {
      const res = await StartupOptDataService.getAllStartupOpts();
  
      dispatch({
        type: RETRIEVE_STARTUP_OPTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateStartupOpt = (id, data) => async (dispatch) => {
    try {
      const res = await StartupOptDataService.updateStartupOpt(id, data);
  
      dispatch({
        type: UPDATE_STARTUP_OPT,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteStartupOpt = (id) => async (dispatch) => {
    try {
      await StartupOptDataService.deleteStartupOpt(id);
  
      dispatch({
        type: DELETE_STARTUP_OPT,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getStartupOptByTitle = (title) => async (dispatch) => {
    try {
      const res = await StartupOptDataService.getStartupOptByTitle(title);
  
      dispatch({
        type: RETRIEVE_STARTUP_OPTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getStartupOptByBiotechCategory = (biotechCategory) => async (dispatch) => {
    try {
      const res = await StartupOptDataService.getStartupOptByBiotechCategory(biotechCategory);
  
      dispatch({
        type: RETRIEVE_STARTUP_OPTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getStartupOptByCountry = (country) => async (dispatch) => {
    try {
      const res = await StartupOptDataService.getStartupOptByCountry(country);
  
      dispatch({
        type: RETRIEVE_STARTUP_OPTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getStartupOptBySupportCategory = (supportCategory) => async (dispatch) => {
    try {
      const res = await StartupOptDataService.getStartupOptBySupportCategory(supportCategory);
  
      dispatch({
        type: RETRIEVE_STARTUP_OPTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  