import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  DELETE_ALL_ITEM,
} from '../actions';

export const INITIAL_STATE = {
  todo: {},
};

export default (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case CREATE_ITEM: {
      return state;
    }
    case UPDATE_ITEM: {
      return state;
    }
    case DELETE_ITEM: {
      return state;
    }
    case DELETE_ALL_ITEM: {
      return { ...state, todo: {} };
    }
    default: {
      return state;
    }
  }
};
