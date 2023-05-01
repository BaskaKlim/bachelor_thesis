import {
    CREATE_INNOVATION,
    RETRIEVE_INNOVATIONS,
    UPDATE_INNOVATION,
    DELETE_INNOVATION
  } from "../actions/types";


  const initialState = [];

function innovationReducer(innovations = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_INNOVATION:
      return [...innovations, payload];

    case RETRIEVE_INNOVATIONS:
      return payload;

    case UPDATE_INNOVATION:
      return innovations.map((innovation) => {
        if (innovation.id === payload.id) {
          return {
            ...innovation,
            ...payload,
          };
        } else {
          return innovation;
        }
      });

    case DELETE_INNOVATION:
      return innovations.filter(({ id }) => id !== payload.id);



    default:
      return innovations;
  }
};

export default innovationReducer;
  