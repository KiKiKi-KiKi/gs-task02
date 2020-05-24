import React, { useState } from 'react';
import { saveLocalStorage, getLocalStorageData } from './storage';

const SAMPLE_DATA = {
  todo: {
    1: {
      id: 1,
      title: 'todo 01',
      body: 'todo 1 body',
      due: '2020-05-01',
      status: false,
      createdAt: '2020-05-24T12:52:01.195Z',
    },
    2: {
      id: 2,
      title: 'todo 02',
      body: 'todo 2 body',
      due: '2020-05-02',
      status: false,
      createdAt: '2020-05-24T12:52:01.195Z',
    },
    3: {
      id: 3,
      title: 'todo 03',
      body: 'todo 3 body',
      due: '2020-06-01',
      status: false,
      createdAt: '2020-05-24T12:52:01.195Z',
    },
  },
  done: {
    4: {
      id: 4,
      title: 'todo 04',
      body: 'todo 4 body',
      due: '2020-05-01',
      status: true,
      createdAt: '2020-05-24T12:52:01.195Z',
      updatedAt: '2020-05-24T13:03:44.963Z',
    },
    5: {
      id: 5,
      title: 'todo 05',
      body: 'todo 5 body',
      due: '2020-06-03',
      status: true,
      createdAt: '2020-05-24T12:52:01.195Z',
      updatedAt: '2020-05-24T13:03:44.963Z',
    },
  },
  expired: {},
};

export default function AddSampleData() {
  const data = getLocalStorageData();
  const [setData, isSetData] = useState(false);

  const onSetSampleData = () => {
    saveLocalStorage(SAMPLE_DATA);
    isSetData(true);
    window.location.reload();
  };

  if (setData || data !== null) {
    return null;
  }

  return (
    <button className="btn btn-link btn-sm" onClick={onSetSampleData}>
      Create Example Data
    </button>
  );
}
