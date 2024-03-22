import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
// import store from './store'

import { Provider } from 'react-redux';


const rootElement  = document.getElementById('root');

// @ts-ignore
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

