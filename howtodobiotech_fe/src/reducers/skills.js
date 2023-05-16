import {
  CREATE_SKILL_OPT,
  RETRIEVE_SKILL_OPTS,
  UPDATE_SKILL_OPT,
  DELETE_SKILL_OPT,
} from "../actions/types.js";

const initialState = {
  skillOpts: [],
};

function skillOptReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SKILL_OPT:
      return {
        ...state,
        skillOpts: [...state.skillOpts, payload],
      };

    case RETRIEVE_SKILL_OPTS:
      return {
        ...state,
        skillOpts: payload,  
      };

    case UPDATE_SKILL_OPT:
      return {
        ...state,
        skillOpts: state.skillOpts.map((skillOpt) => {
          if (skillOpt.id === payload.id) {
            return {
              ...skillOpt,
              ...payload,
            };
          } else {
            return skillOpt;
          }
        }),
      };

    case DELETE_SKILL_OPT:
      return {
        ...state,
        skillOpts: state.skillOpts.filter(({ id }) => id !== payload.id),
      };

    default:
      return state;
  }
}

export default skillOptReducer;
