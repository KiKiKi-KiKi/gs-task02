import React from 'react';
import { formatDate } from '../utils';

const TodoItem = ({ index, id, title, body, due, onChange, onDelete }) => {
  return (
    <tr>
      <td>
        {index}
        <span className="d-none">{id}</span>
      </td>
      <td>{due}</td>
      <td>
        <b className="todo-title">{title}</b>
        <div className="toto-body">{body}</div>
      </td>
      <td>
        <button className="btn btn-success btn-sm" onClick={onChange}>
          DONE
        </button>
        <button className="btn btn-danger btn-sm ml-1" onClick={onDelete}>
          DELETE
        </button>
      </td>
    </tr>
  );
};

const DoneItem = ({ index, id, title, body, updatedAt, onChange }) => {
  return (
    <tr>
      <td>
        {index}
        <span className="d-none">{id}</span>
      </td>
      <td>{formatDate(updatedAt, 'YYYY-MM-DD hh:mm:ss')}</td>
      <td>
        <b className="todo-title">{title}</b>
        <div className="toto-body">{body}</div>
      </td>
      <td>
        <button className="btn btn-warning btn-sm" onClick={onChange}>
          INCOMPLETE
        </button>
      </td>
    </tr>
  );
};

export default function Item({ status, ...props }) {
  return status ? <DoneItem {...props} /> : <TodoItem {...props} />;
}
