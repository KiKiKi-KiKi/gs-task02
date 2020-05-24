import React, { useState, useCallback, useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import { CREATE_ITEM } from '../actions';
import { getToday, isPastDate } from '../utils';

export default function AddItemForm() {
  const today = getToday();
  const { dispatch } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [due, setDue] = useState(today);
  const [disabled, setDisabled] = useState(true);

  const onValidate = useCallback((title) => {
    setDisabled(() => !(title && title.trim()));
  }, []);

  const onChange = useCallback(
    (callback) => (e) => {
      e.preventDefault();
      callback(e.target.value);
    },
    [],
  );

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

  const resetForm = useCallback(() => {
    setTitle('');
    setBody('');
    setDue(today);
  }, [today]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: CREATE_ITEM, item: { title, body, due } });
    resetForm();
  };

  useEffect(() => {
    onValidate(title);
  }, [title, onValidate]);

  return (
    <form>
      <div className="form-group">
        <label htmlFor="todo-due">Time limit</label>
        <div className="d-inline ml-2">
          <input
            type="date"
            id="todo-due"
            value={due}
            onChange={onChangeLimit(today)}
          />
        </div>
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
      {/*
      <div className="form-group">
        <label htmlFor="todo-image">Image</label>
        <input
          type="file"
          accept="image/*"
          capture="camera"
          id="todo-image"
          className="form-control-file"
        />
      </div>
       */}
      <button
        type="submit"
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={disabled}
      >
        ADD
      </button>
    </form>
  );
}
