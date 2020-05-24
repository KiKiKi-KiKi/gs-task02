import React, { useContext, useCallback, useMemo } from 'react';
import AppContext from '../contexts/AppContext';
import {
  ITEM_COMPLETE,
  DELETE_ITEM,
  EXPORED_ITEM_COMPLETE,
  DELET_EXPIRED_ITEM,
} from '../actions';
import EditContext from '../contexts/EditContext';
import { SET_EDIT_ITEM } from '../actions/edit';
import Item from './Item';

export default function ItemsList() {
  const {
    state: { todo, expired },
    dispatch,
  } = useContext(AppContext);

  const { editDispatch } = useContext(EditContext);

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

  const onEditItem = useCallback(
    (item) => (e) => {
      e.preventDefault();
      editDispatch({ type: SET_EDIT_ITEM, item });
    },
    [editDispatch],
  );

  const createList = useCallback(
    (listObj) => {
      return Object.keys(listObj).map((id, i) => {
        const item = listObj[id];
        const index = i + 1;
        return (
          <Item
            key={id}
            index={index}
            onChange={onChangeStateus(item)}
            onDelete={onDelete({ index, ...item })}
            onEdit={onEditItem(item)}
            {...item}
          />
        );
      });
    },
    [onChangeStateus, onDelete, onEditItem],
  );

  const todoList = useMemo(() => {
    return createList(todo);
  }, [todo, createList]);

  const expiredList = useMemo(() => {
    return createList(expired);
  }, [expired, createList]);

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
