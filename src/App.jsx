import React, { useReducer, useEffect } from 'react';
import AppContext from './contexts/AppContext';
import reducer, { INITIAL_STATE } from './reducers';
import {
  saveLocalStorage,
  getLocalStorageData,
  clearLocalStorageData,
} from './storage';
import { isPastDate, getToday } from './utils';
import ClearStorageButton from './components/ClearStorageButton';
import AddItemForm from './components/AddItemForm';
import ItemsList from './components/ItemsList';
import DoneItemList from './components/DoneItemList';
import DeleteDoneItemsButton from './components/DeleteDoneItemsButton';

const mapState = ({ todo, done, expired }) => {
  if (!Object.keys(todo).length) {
    return { todo, done, expired };
  }

  const today = getToday();
  const data = Object.keys(todo).reduce(
    (data, id) => {
      const item = todo[id];
      if (isPastDate(today)(item.due)) {
        return {
          todo: data.todo,
          expired: {
            ...data.expired,
            [id]: { ...item },
          },
        };
      }
      return {
        todo: {
          ...data.todo,
          [id]: { ...item },
        },
        expired: data.expired,
      };
    },
    {
      todo: {},
      expired: { ...expired },
    },
  );

  return { ...data, done };
};

export default function App() {
  const savedState = getLocalStorageData();
  const initialState = savedState ? JSON.parse(savedState) : INITIAL_STATE;
  const [state, dispatch] = useReducer(reducer, mapState(initialState));

  useEffect(() => {
    if (state.status === 'destroy') {
      clearLocalStorageData();
    } else {
      console.log('SAVE to Storage');
      // eslint-disable-next-line no-empty-pattern
      const { status: [] = [], ...data } = state;
      saveLocalStorage(data);
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
