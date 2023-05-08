import {
    CREATE_SKILL_OPT,
    RETRIEVE_SKILL_OPTS,
    UPDATE_SKILL_OPT,
    DELETE_SKILL_OPT,
  } from "../actions/types.js";
  
  const initialState = [];
  
  function skillOptReducer(skillOpts = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_SKILL_OPT:
        return [...skillOpts, payload];
  
      case RETRIEVE_SKILL_OPTS:
        return payload;
  
      case UPDATE_SKILL_OPT:
        return skillOpts.map((skillOpt) => {
          if (skillOpt.id === payload.id) {
            return {
              ...skillOpt,
              ...payload,
            };
          } else {
            return skillOpt;
          }
        });
  
      case DELETE_SKILL_OPT:
        return skillOpts.filter(({ id }) => id !== payload.id);
  
      default:
        return skillOpts;
    }
  }
  
  export default skillOptReducer;
  