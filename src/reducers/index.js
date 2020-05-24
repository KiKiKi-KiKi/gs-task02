import { timeCurrentIso8601 } from '../utils';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  ITEM_COMPLETE,
  ITEM_INCOMPLETE,
  DELETE_ALL_ITEM,
} from '../actions';

const ID_PREFIX = 'TODO-';

export const INITIAL_STATE = {
  todo: {},
  done: {},
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
    case ITEM_COMPLETE: {
      console.log('ITEM_COMPLETE', action.id);
      const id = action.id;
      const { [id]: item, ...todo } = state.todo;
      const done = state.done;

      return {
        ...state,
        todo,
        done: {
          ...done,
          [id]: {
            ...item,
            status: action.complete,
            updatedAt: timeCurrentIso8601(),
          },
        },
        status: 'item compoete',
      };
    }
    case ITEM_INCOMPLETE: {
      console.log('ITEM_COMPLETE', action.id);
      const { [action.id]: item, ...done } = state.done;
      return {
        ...state,
        todo: {
          ...state.todo,
          [item.id]: {
            ...item,
            status: action.complete,
            updatedAt: timeCurrentIso8601(),
          },
        },
        done,
        status: 'item incomplete',
      };
    }
    case DELETE_ITEM: {
      console.log('DELETE_ITEM', action.id);
      const deleteID = action.id;
      /* eslint-disable no-empty-pattern */
      const todo = (({ [deleteID]: {} = {}, ...data }) => data)(state.todo);
      /* eslint-enable no-empty-pattern */

      return { ...state, todo, status: 'delete item' };
    }
    case DELETE_ALL_ITEM: {
      console.log('DELETE_ALL_ITEM');
      return { ...INITIAL_STATE, status: 'destroy' };
    }
    default: {
      return state;
    }
  }
};
