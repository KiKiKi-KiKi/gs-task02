import React, { useReducer, useEffect } from 'react';
import AppContext from './contexts/AppContext';
import reducer, { INITIAL_STATE } from './reducers';
import {
  saveLocalStorage,
  getLocalStorageData,
  clearLocalStorageData,
} from './storage';
import ClearStorageButton from './components/ClearStorageButton';
import AddItemForm from './components/AddItemForm';
import ItemsList from './components/ItemsList';
import DoneItemList from './components/DoneItemList';
import DeleteDoneItemsButton from './components/DeleteDoneItemsButton';

export default function App() {
  const savedState = getLocalStorageData();
  const initialState = savedState ? JSON.parse(savedState) : INITIAL_STATE;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.status === 'destroy') {
      clearLocalStorageData();
    } else {
      console.log('SAVE to Storage');
      const { todo, done } = state;
      saveLocalStorage({ todo, done });
    }
  }, [state]);

  console.log(state);

  return (
    <>
      <div className="container">
        <AppContext.Provider value={{ state, dispatch }}>
          <header className="navbar navbar-expand-lg">
            <h1>TODO APP</h1>
            <div className="ml-md-auto">
              <ClearStorageButton />
            </div>
          </header>
          <div className="main">
            <ItemsList />
            <hr />
            <AddItemForm />
            <hr />
            <header className="navbar">
              <h3>COMPLETED</h3>
              <div className="ml-md-auto">
                <DeleteDoneItemsButton />
              </div>
            </header>
            <DoneItemList />
          </div>
        </AppContext.Provider>
      </div>
    </>
  );
}
