import { timeCurrentIso8601, getToday, isPastDate } from '../utils';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  DELETE_DONE_ITEMS,
  ITEM_COMPLETE,
  ITEM_INCOMPLETE,
  EXPORED_ITEM_COMPLETE,
  DELET_EXPIRED_ITEM,
  DELETE_ALL_ITEM,
} from '../actions';

const ID_PREFIX = 'TODO-';

export const INITIAL_STATE = {
  todo: {},
  done: {},
  expired: {},
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
    case EXPORED_ITEM_COMPLETE: {
      console.log('EXPORED_ITEM_COMPLETE', action.id);
      const id = action.id;
      const { [id]: item, ...expired } = state.expired;
      const done = state.done;

      return {
        ...state,
        expired,
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
      const incompletItem = {
        ...item,
        status: action.complete,
        updatedAt: timeCurrentIso8601(),
        expired: false,
      };

      // check due date
      if (isPastDate(getToday())(item.due)) {
        return {
          ...state,
          expired: {
            ...state.expired,
            [item.id]: {
              ...incompletItem,
              expired: true,
            },
          },
          done,
          status: 'item incomplete',
        };
      }

      return {
        ...state,
        todo: {
          ...state.todo,
          [item.id]: incompletItem,
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
    case DELET_EXPIRED_ITEM: {
      console.log('DELET_EXPIRED_ITEM', action.id);
      const deleteID = action.id;
      /* eslint-disable no-empty-pattern */
      const expired = (({ [deleteID]: {} = {}, ...data }) => data)(
        state.expired,
      );
      /* eslint-enable no-empty-pattern */

      return { ...state, expired, status: 'delete item' };
    }
    case DELETE_DONE_ITEMS: {
      console.log('DELETE_DONE_ITEMS');
      return { ...state, done: {} };
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
