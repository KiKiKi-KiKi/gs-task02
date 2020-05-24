import React, { useReducer } from 'react';
import reducer, { DEFAULT_STATE } from '../reducers/edit';
import EditContext from '../contexts/EditContext';
import ItemsList from './ItemsList';
import Portal from './Portal';
import EditModal from './EditModal';

export default function TodoList() {
  const [editItem, editDispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <EditContext.Provider value={{ editItem, editDispatch }}>
      <ItemsList />
      <Portal>
        <EditModal />
      </Portal>
    </EditContext.Provider>
  );
}
