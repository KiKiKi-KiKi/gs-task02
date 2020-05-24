import { timeCurrentIso8601 } from '../utils';
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  DELETE_ALL_ITEM,
} from '../actions';

const ID_PREFIX = 'TODO-';

export const INITIAL_STATE = {
  todo: {},
};

export default (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case CREATE_ITEM: {
      const todo = state.todo;
      const createdAt = timeCurrentIso8601();
      const id = ID_PREFIX + createdAt;
      return {
        ...state,
        todo: { ...todo, [id]: { ...actions.item, id, createdAt } },
      };
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
