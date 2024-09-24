import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

// Get root element from DOM
const container = document.getElementById('root');

// Create a root
const root = ReactDOM.createRoot(container);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
