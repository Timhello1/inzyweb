import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import "./Styles/styles.css";
<<<<<<< HEAD
import {HashRouter} from "react-router-dom"
=======
import {BrowserRouter} from "react-router-dom"
>>>>>>> parent of a09d7dd (Updates)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
      <HashRouter>
          <App />
      </HashRouter>
=======
      <BrowserRouter>
          <App />
      </BrowserRouter>
>>>>>>> parent of a09d7dd (Updates)
  </React.StrictMode>
);

