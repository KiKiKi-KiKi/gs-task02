import React from 'react';

export default function Item({ index, id, thumb, title, body, onDelete }) {
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
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          DELETE
        </button>
      </td>
    </tr>
  );
}
