// actions/experts.js
import {
    CREATE_EXPERT,
    RETRIEVE_EXPERTS,
    UPDATE_EXPERT,
    DELETE_EXPERT,
  } from "./types";
  
  import ExpertDataService from "../service/ExpertDataService";
  
  export const createExpert = (
    firstName,
    lastName,
    jobPosition,
    email,
    linkedinUrl,
    backgroundDescription,
    countries,
    expertises
  ) => async (dispatch) => {
    try {
      const res = await ExpertDataService.createExpert({
        firstName,
        lastName,
        jobPosition,
        email,
        linkedinUrl,
        backgroundDescription,
        countries,
        expertises,
      });
  
      dispatch({
        type: CREATE_EXPERT,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const getAllExperts = () => async (dispatch) => {
    try {
      const res = await ExpertDataService.getAllExperts();
  
      dispatch({
        type: RETRIEVE_EXPERTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateExpert = (id, data) => async (dispatch) => {
    try {
      const res = await ExpertDataService.updateExpert(id, data);
  
      dispatch({
        type: UPDATE_EXPERT,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteExpert = (id) => async (dispatch) => {
    try {
      await ExpertDataService.deleteExpert(id);
  
      dispatch({
        type: DELETE_EXPERT,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getExpertByLastName = (lastName) => async (dispatch) => {
    try {
      const res = await ExpertDataService.getExpertByLastName(lastName);
  
      dispatch({
        type: RETRIEVE_EXPERTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getExpertByExpertise = (expertiseName) => async (dispatch) => {
    try {
      const res = await ExpertDataService.getExpertByExpertise(expertiseName);
  
      dispatch({
        type: RETRIEVE_EXPERTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getExpertByCountry = (countryName) => async (dispatch) => {
    try {
      const res = await ExpertDataService.getExpertByCountry(countryName);
  
      dispatch({
        type: RETRIEVE_EXPERTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  