import React, { useContext, useCallback, useMemo } from 'react';
import AppContext from '../contexts/AppContext';
import {
  ITEM_COMPLETE,
  DELETE_ITEM,
  EXPORED_ITEM_COMPLETE,
  DELET_EXPIRED_ITEM,
} from '../actions';
import Item from './Item';

export default function ItemsList() {
  const {
    state: { todo, expired },
    dispatch,
  } = useContext(AppContext);

  const onDelete = useCallback(
    ({ index, id, title, expired }) => {
      const type = expired ? DELET_EXPIRED_ITEM : DELETE_ITEM;
      return (e) => {
        e.preventDefault();
        if (!window.confirm(`Really delete #${index}: ${title} ?`)) {
          return false;
        }

        dispatch({ type, id });
      };
    },
    [dispatch],
  );

  const onChangeStateus = useCallback(
    ({ id, status, expired }) => {
      const type = expired ? EXPORED_ITEM_COMPLETE : ITEM_COMPLETE;
      return (e) => {
        e.preventDefault();
        dispatch({ type, id, complete: !status });
      };
    },
    [dispatch],
  );

  const todoList = useMemo(() => {
    return Object.keys(todo).map((id, i) => {
      const item = todo[id];
      const index = i + 1;
      return (
        <Item
          key={id}
          index={index}
          onChange={onChangeStateus(item)}
          onDelete={onDelete({ index, ...item })}
          {...item}
        />
      );
    });
  }, [todo, onChangeStateus, onDelete]);

  const expiredList = useMemo(() => {
    return Object.keys(expired).map((id, i) => {
      const item = expired[id];
      const index = i + 1;
      return (
        <Item
          key={id}
          index={index}
          onChange={onChangeStateus(item)}
          onDelete={onDelete({ index, ...item })}
          {...item}
        />
      );
    });
  }, [expired, onChangeStateus, onDelete]);

  return (
    <>
      <p className="font-weight-bold">Expired</p>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Due</th>
            <th>Title</th>
            <th>{/* actions */}</th>
          </tr>
        </thead>
        <tbody>{expiredList}</tbody>
      </table>
      <p className="font-weight-bold">TODO</p>
      <table className="table table-striped table-hover">
        <tbody>{todoList}</tbody>
      </table>
    </>
  );
}
