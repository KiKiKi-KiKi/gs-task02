import React, { useReducer, useEffect, useCallback } from 'react';
import AppContext from './contexts/AppContext';
import { DELETE_ALL_ITEM } from './actions';
import reducer, { INITIAL_STATE } from './reducers';
import {
  saveLocalStorage,
  getLocalStorageData,
  clearLocalStorageData,
} from './storage';
import AddItemForm from './components/AddItemForm';
import ItemsList from './components/ItemsList';

export default function App() {
  const savedState = getLocalStorageData();
  const initialState = savedState ? JSON.parse(savedState) : INITIAL_STATE;
  const [state, dispatch] = useReducer(reducer, initialState);

  const onClearAllData = useCallback(() => {
    if (!window.confirm('Really delete all storage data?')) {
      return false;
    }
    dispatch({ type: DELETE_ALL_ITEM });
  }, [dispatch]);

  const hasItem = Object.keys(state.todo).length;

  useEffect(() => {
    if (state.status === 'destroy') {
      clearLocalStorageData();
    } else {
      console.log('SAVE to Storage');
      const { todo } = state;
      saveLocalStorage({ todo });
    }
  }, [state]);

  return (
    <>
      <div className="container">
        <header className="navbar navbar-expand-lg">
          <h1>TODO APP</h1>
          <div className="ml-md-auto">
            <button
              className="btn btn-danger btn-sm"
              onClick={onClearAllData}
              disabled={!hasItem}
            >
              DELETE ALL DATA
            </button>
          </div>
        </header>
        <AppContext.Provider value={{ state, dispatch }}>
          <div className="main">
            <ItemsList />
            <hr />
            <AddItemForm />
          </div>
        </AppContext.Provider>
      </div>
    </>
  );
}
