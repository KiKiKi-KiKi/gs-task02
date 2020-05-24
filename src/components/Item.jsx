import React from 'react';

const TodoItem = ({ index, id, thumb, title, body, onChange, onDelete }) => {
  return (
    <tr>
      <td>
        {index}
        <span className="d-none">{id}</span>
      </td>
      <td>{thumb}</td>
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

const DoneItem = ({ index, id, thumb, title, body, onChange }) => {
  return (
    <tr>
      <td>
        {index}
        <span className="d-none">{id}</span>
      </td>
      <td>{thumb}</td>
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
