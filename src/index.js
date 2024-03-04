import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import "./Styles/styles.css";
import "react-toastify/dist/ReactToastify.css";

import {HashRouter} from "react-router-dom"
import {ToastContainer} from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

      <HashRouter>
          <App />
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />
          {/* Same as */}
          <ToastContainer />
      </HashRouter>


  </React.StrictMode>
);