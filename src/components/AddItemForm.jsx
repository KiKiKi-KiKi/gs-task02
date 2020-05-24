import React, { useState, useCallback, useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import { CREATE_ITEM } from '../actions';

export default function AddItemForm() {
  const { dispatch } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
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

  const resetForm = useCallback(() => {
    setTitle('');
    setBody('');
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: CREATE_ITEM, item: { title, body } });
    resetForm();
  };

  useEffect(() => {
    onValidate(title);
  }, [title, onValidate]);

  return (
    <form>
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
