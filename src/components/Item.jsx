import React from 'react';

const IncompleteBtn = ({ onChange }) => {
  return (
    <button className="btn btn-warning btn-sm" onClick={onChange}>
      INCOMPLETE
    </button>
  );
};

const CompleteBtn = ({ onChange }) => {
  return (
    <button className="btn btn-success btn-sm" onClick={onChange}>
      DONE
    </button>
  );
};

export default function Item({
  index,
  id,
  thumb,
  title,
  body,
  status,
  onChange,
  onDelete,
}) {

  const completeBtn = status ? <IncompleteBtn onChange={onChange} /> : <CompleteBtn onChange={onChange} />

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
        {completeBtn}
        <button className="btn btn-danger btn-sm ml-1" onClick={onDelete}>
          DELETE
        </button>
      </td>
    </tr>
  );
}
