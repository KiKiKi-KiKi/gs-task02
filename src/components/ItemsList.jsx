import React, { useContext, useCallback } from 'react';
import AppContext from '../contexts/AppContext';
import { DELETE_ITEM } from '../actions';
import Item from './Item';

export default function ItemsList() {
  const {
    state: { todo },
    dispatch,
  } = useContext(AppContext);

  const onDelete = useCallback(
    ({ index, id, title }) => (e) => {
      e.preventDefault();
      if (!window.confirm(`Really delete #${index}: ${title} ?`)) {
        return false;
      }

      dispatch({ type: DELETE_ITEM, id });
    },
    [dispatch],
  );

  const todoList = Object.keys(todo).map((id, i) => {
    const item = todo[id];
    const index = i + 1;
    return (
      <Item
        key={id}
        index={index}
        onDelete={onDelete({ index, ...item })}
        {...item}
      />
    );
  });

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Thumb</th>
            <th>Title</th>
            <th>{/* actions */}</th>
          </tr>
        </thead>
        <tbody>{todoList}</tbody>
      </table>
    </>
  );
}