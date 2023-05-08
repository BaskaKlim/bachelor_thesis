import {
    CREATE_EXPERT,
    RETRIEVE_EXPERTS,
    UPDATE_EXPERT,
    DELETE_EXPERT,
  } from "../actions/types";
  
  const initialState = [];
  
  function expertReducer(experts = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_EXPERT:
        return [...experts, payload];
  
      case RETRIEVE_EXPERTS:
        return payload;
  
      case UPDATE_EXPERT:
        return experts.map((expert) => {
          if (expert.id === payload.id) {
            return {
              ...expert,
              ...payload,
            };
          } else {
            return expert;
          }
        });
  
      case DELETE_EXPERT:
        return experts.filter(({ id }) => id !== payload.id);
  
      default:
        return experts;
    }
  }
  
  export default expertReducer;
  