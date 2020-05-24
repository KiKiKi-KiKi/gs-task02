import React, { useState, useCallback, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import { UPDATE_ITEM, UPDATE_EXPIRED_ITEM } from '../actions';
import { getToday, isPastDate } from '../utils';

export default function EditModalForm({ item, onCancel }) {
  const today = getToday();
  const { dispatch } = useContext(AppContext);

  console.log(item);

  const { id, expired, ...props } = item;
  const type = expired ? UPDATE_EXPIRED_ITEM : UPDATE_ITEM;
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  const [due, setDue] = useState(props.due);

  const onChange = useCallback(
    (callback) => (e) => {
      e.preventDefault();
      callback(e.target.value);
    },
    [],
  );

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: type, item: { id, title, body, due } });
    onCancel(e);
  };

  const onChangeLimit = useCallback(
    (today) => (e) => {
      e.preventDefault();
      const dueDate = e.target.value;
      const pastDate = isPastDate(today)(dueDate);
      if (pastDate) {
        alert('Please select today or futuer date!');
        return;
      }
      setDue(dueDate);
    },
    [],
  );

  const onValidate = (title, isExpired) => {
    return !(title && title.trim()) || isExpired;
  };

  const isExpired = isPastDate(today)(due);
  const disabled = onValidate(title, isExpired);

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Edit Item</h5>
      </div>
      <div className="modal-body">
        <div className={`form-group ${isExpired && 'text-danger'}`}>
          <label htmlFor="todo-due">Due date</label>
          <div className="d-inline ml-2">
            <input
              type="date"
              id="todo-due"
              value={due}
              onChange={onChangeLimit(today)}
            />
          </div>
          {isExpired && <small className="d-block">Select new Due date!</small>}
        </div>
        <div className="form-group">
          <label htmlFor="todo-title">Title</label>
          <input
            type="text"
            id="todo-title"
            className="form-control"
            placeholder="Todo Title"
            value={title}
            onChange={onChange(setTitle)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="todo-body">Body</label>
          <textarea
            id="todo-body"
            className="form-control"
            value={body}
            onChange={onChange(setBody)}
          />
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={disabled}
        >
          Update
        </button>
      </div>
    </>
  );
}
