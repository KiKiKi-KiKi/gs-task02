import { SET_EDIT_ITEM, RESET_EDIT } from '../actions/edit';

export const DEFAULT_STATE = null;

const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_EDIT_ITEM: {
      return action.item;
    }
    case RESET_EDIT: {
      return DEFAULT_STATE;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
