import {
    CREATE_STARTUP_OPT,
    RETRIEVE_STARTUP_OPTS,
    UPDATE_STARTUP_OPT,
    DELETE_STARTUP_OPT,
  } from "../actions/types";
  
  const initialState = [];
  
  function startupOptReducer(startupOpts = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_STARTUP_OPT:
        return [...startupOpts, payload];
  
      case RETRIEVE_STARTUP_OPTS:
        return payload;
  
      case UPDATE_STARTUP_OPT:
        return startupOpts.map((startupOpt) => {
          if (startupOpt.id === payload.id) {
            return {
              ...startupOpt,
              ...payload,
            };
          } else {
            return startupOpt;
          }
        });
  
      case DELETE_STARTUP_OPT:
        return startupOpts.filter(({ id }) => id !== payload.id);
  
      default:
        return startupOpts;
    }
  }
  
  export default startupOptReducer;
  