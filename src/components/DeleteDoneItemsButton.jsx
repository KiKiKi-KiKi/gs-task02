import React, { useContext, useCallback } from 'react';
import { DELETE_DONE_ITEMS } from '../actions';
import AppContext from '../contexts/AppContext';

export default function DeleteDoneItemsButton() {
  const {
    state: { done },
    dispatch,
  } = useContext(AppContext);

  const hasItem = Object.keys(done).length;

  const onClearItem = useCallback(() => {
    if (!window.confirm('Really delete all done items?')) {
      return false;
    }
    dispatch({ type: DELETE_DONE_ITEMS });
  }, [dispatch]);

  return (
    <button
      className="btn btn-danger"
      onClick={onClearItem}
      disabled={!hasItem}
    >
      CLEAR DONE ITEMS
    </button>
  );
}
