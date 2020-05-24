import React, { useContext, useCallback } from 'react';
import AppContext from '../contexts/AppContext';
import { ITEM_INCOMPLETE } from '../actions';
import Item from './Item';

export default function DoneItemList() {
  const {
    state: { done },
    dispatch,
  } = useContext(AppContext);

  const onChangeStateus = useCallback(
    ({ id, status }) => (e) => {
      e.preventDefault();
      dispatch({ type: ITEM_INCOMPLETE, id, complete: !status });
    },
    [dispatch],
  );

  const todoList = Object.keys(done).map((id, i) => {
    const item = done[id];
    const index = i + 1;
    return (
      <Item key={id} index={index} onChange={onChangeStateus(item)} {...item} />
    );
  });

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Done</th>
            <th>Title</th>
            <th>{/* actions */}</th>
          </tr>
        </thead>
        <tbody>{todoList}</tbody>
      </table>
    </>
  );
}
