import React, { useContext, useCallback } from 'react';
import { DELETE_ALL_ITEM } from '../actions';
import AppContext from '../contexts/AppContext';

export default function ClearStorageButton() {
  const { state, dispatch } = useContext(AppContext);

  const hasItem = Object.keys(state.todo).length;

  const onClearAllData = useCallback(() => {
    if (!window.confirm('Really delete all storage data?')) {
      return false;
    }
    dispatch({ type: DELETE_ALL_ITEM });
  }, [dispatch]);

  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={onClearAllData}
      disabled={!hasItem}
    >
      DELETE ALL DATA
    </button>
  );
}
