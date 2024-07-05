import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.scss'; // Make sure this path is correct
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);