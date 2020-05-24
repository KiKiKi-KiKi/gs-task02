import React, { useContext, useEffect, useCallback, useRef } from 'react';
import EditContext from '../contexts/EditContext';
import { RESET_EDIT } from '../actions/edit';

export default function EditModal() {
  const { editItem, editDispatch } = useContext(EditContext);
  const modalRef = useRef();

  const onCancel = useCallback(
    (e) => {
      e.preventDefault();
      editDispatch({ type: RESET_EDIT });
    },
    [editDispatch],
  );

  useEffect(() => {
    if (!editItem) {
      return;
    }

    const body = document.querySelector('body');
    body.classList.add('modal-open');

    setTimeout(() => {
      modalRef.current.classList.add('show');
    }, 10);

    return () => {
      body.classList.remove('modal-open');
    };
  }, [editItem]);

  if (!editItem) {
    return null;
  }

  return (
    <>
      <div className="modal fade" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Item</h5>
            </div>
            <div className="modal-body"></div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button className="btn btn-success">Update</button>
            </div>
          </div>
        </div>
        <div className="modal-backdrop show" onClick={onCancel}></div>
      </div>
    </>
  );
}
