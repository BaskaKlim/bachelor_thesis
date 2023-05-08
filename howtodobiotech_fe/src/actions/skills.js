import {
  CREATE_SKILL_OPT,
  RETRIEVE_SKILL_OPTS,
  UPDATE_SKILL_OPT,
  DELETE_SKILL_OPT,
} from "./types";

import SkillOptDataService from "../service/Skill.service";

export const createSkillOpt = (
  title,
  organizer,
  description,
  startDate,
  endDate,
  website,
  countries,
  biotechCategories,
  skillCategories
) => async (dispatch) => {
  try {
    const res = await SkillOptDataService.createSkillOpt({
      title,
      organizer,
      description,
      startDate,
      endDate,
      website,
      countries,
      biotechCategories,
      skillCategories,
    });

    dispatch({
      type: CREATE_SKILL_OPT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getAllSkillOpts = () => async (dispatch) => {
  try {
    const res = await SkillOptDataService.getAllSkillOpts();

    dispatch({
      type: RETRIEVE_SKILL_OPTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateSkillOpt = (id, data) => async (dispatch) => {
  try {
    const res = await SkillOptDataService.updateSkillOpt(id, data);

    dispatch({
      type: UPDATE_SKILL_OPT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteSkillOpt = (id) => async (dispatch) => {
  try {
    await SkillOptDataService.deleteSkillOpt(id);

    dispatch({
      type: DELETE_SKILL_OPT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSkillOptByTitle = (title) => async (dispatch) => {
  try {
    const res = await SkillOptDataService.getSkillOptByTitle(title);

    dispatch({
      type: RETRIEVE_SKILL_OPTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSkillOptByBiotechCategory = (biotechCategory) => async (dispatch) => {
  try {
    const res = await SkillOptDataService.getSkillOptByBiotechCategory(biotechCategory);

    dispatch({
      type: RETRIEVE_SKILL_OPTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSkillOptByCountry = (country) => async (dispatch) => {
  try {
    const res = await SkillOptDataService.getSkillOptByCountry(country);

    dispatch({
      type: RETRIEVE_SKILL_OPTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSkillOptBySkillCategory = (skillCategory) => async (dispatch) => {
  try {
    const res = await SkillOptDataService.getSkillOptBySkillCategory(skillCategory);

    dispatch({
      type: RETRIEVE_SKILL_OPTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
