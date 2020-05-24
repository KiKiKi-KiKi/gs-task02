import React, { useContext, useEffect, useCallback, useRef } from 'react';
import EditContext from '../contexts/EditContext';
import { RESET_EDIT } from '../actions/edit';
import EditModalForm from './EditModalForm';

export default function EditModal() {
  const { editItem, editDispatch } = useContext(EditContext);
  const modalRef = useRef();

  const onCancel = useCallback(() => editDispatch({ type: RESET_EDIT }), [
    editDispatch,
  ]);

  useEffect(() => {
    if (!editItem) {
      return;
    }

    const body = document.querySelector('body');
    body.classList.add('modal-open');

    setTimeout(() => {
      modalRef.current.classList.add('show');
    }, 100);

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
            <EditModalForm item={editItem} onCancel={onCancel} />
          </div>
        </div>
        <div className="modal-backdrop show" onClick={onCancel}></div>
      </div>
    </>
  );
}
