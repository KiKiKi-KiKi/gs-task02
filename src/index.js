import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AddSampleData from './AddSampleData';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <AddSampleData />
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
);
