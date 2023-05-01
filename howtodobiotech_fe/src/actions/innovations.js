import {
    CREATE_INNOVATION,
    RETRIEVE_INNOVATIONS,
    UPDATE_INNOVATION,
    DELETE_INNOVATION
  } from "./types";
  
  import InnovationDataService from "../service/innovation.service.js";
  
  export const createInnovation = (title, description,website,countries,categories) => async (dispatch) => {
    try {
      const res = await InnovationDataService.createInnovation({ title, description,website,countries,categories });
  
      dispatch({
        type: CREATE_INNOVATION,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const getAllInnovations = () => async (dispatch) => {
    try {
      const res = await InnovationDataService.getAllInnovations();
  
      dispatch({
        type: RETRIEVE_INNOVATIONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateInnovation = (id, data) => async (dispatch) => {
    try {
      const res = await InnovationDataService.updateInnovation(id, data);
  
      dispatch({
        type: UPDATE_INNOVATION,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteInnovation = (id) => async (dispatch) => {
    try {
      await InnovationDataService.deleteInnovation(id);
  
      dispatch({
        type: DELETE_INNOVATION,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  

  
  export const getInnovationByTitle = (title) => async (dispatch) => {
    try {
      const res = await InnovationDataService.getInnovationOptByTitle(title);
  
      dispatch({
        type: RETRIEVE_INNOVATIONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getInnovationByBiotechCategory = (biotechCategory) => async (dispatch) => {
    try {
      const res = await InnovationDataService.getInnovationByBiotechCategory(biotechCategory);
  
      dispatch({
        type: RETRIEVE_INNOVATIONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getInnovationByCountry = (country) => async (dispatch) => {
    try {
      const res = await InnovationDataService.getInnovationByCountry(country);
  
      dispatch({
        type: RETRIEVE_INNOVATIONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };