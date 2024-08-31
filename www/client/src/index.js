import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // This would include the Tailwind imports
import App from './App';

// ##  React 18 introduced a new root API for rendering //
// ReactDOM.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//  document.getElementById('root')
//);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



