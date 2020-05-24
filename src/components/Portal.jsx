import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const el = document.createElement('div');

export default function Portal({ children }) {
  useEffect(() => {
    const body = document.querySelector('body');
    body.appendChild(el);
  }, []);

  return createPortal(children, el);
}
