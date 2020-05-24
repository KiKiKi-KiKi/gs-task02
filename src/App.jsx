import React, { useReducer, useEffect } from 'react';
import AppContext from './contexts/AppContext';
import reducer, { INITIAL_STATE } from './reducers';
import { saveLocalStorage, getLocalStorageData } from './storage';
import AddItemForm from './components/AddItemForm';
import ItemsList from './components/ItemsList';

export default function App() {
  const savedState = getLocalStorageData();
  const initialState = savedState ? JSON.parse(savedState) : INITIAL_STATE;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    saveLocalStorage(state);
  }, [state]);

  return (
    <>
      <div className="container">
        <h1>TODO APP</h1>
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
