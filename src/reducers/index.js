import { timeCurrentIso8601 } from '../utils';
import {
  CREATE_ITEM,
  CHANGE_ITEM_STATUS,
  DELETE_ITEM,
  DELETE_ALL_ITEM,
} from '../actions';

const ID_PREFIX = 'TODO-';

export const INITIAL_STATE = {
  todo: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ITEM: {
      console.log('CREATE_ITEM', action.item);
      const todo = state.todo;
      const createdAt = timeCurrentIso8601();
      const id = ID_PREFIX + createdAt;

      return {
        ...state,
        todo: {
          ...todo,
          [id]: {
            ...action.item,
            id,
            status: false,
            createdAt,
          },
        },
        status: 'create item',
      };
    }
    case CHANGE_ITEM_STATUS: {
      console.log('CHANGE_ITEM_STATUS', action.id);
      const id = action.id;
      const { [id]: item, ...todoList } = state.todo;

      const todo = {
        ...todoList,
        [id]: {
          ...item,
          status: action.complete,
          updatedAt: timeCurrentIso8601(),
        },
      };

      return { ...state, todo, status: 'change item status' };
    }
    case DELETE_ITEM: {
      console.log('DELETE_ITEM', action.id);
      const deleteID = action.id;
      /* eslint-disable no-empty-pattern */
      const todo = (({ [deleteID]: { } = {}, ...data }) => data)(state.todo);
      /* eslint-enable no-empty-pattern */

      return { ...state, todo, status: 'delete item' };
    }
    case DELETE_ALL_ITEM: {
      console.log('DELETE_ALL_ITEM');
      return { ...state, todo: {}, status: 'destroy' };
    }
    default: {
      return state;
    }
  }
};
