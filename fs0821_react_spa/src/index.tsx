import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Grid from './routes/grid';
import Payments from './routes/payments';
import { GridProvider } from './providers/grid';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/* <React.StrictMode> */
/* strict mode causes rendering twice */
/* </React.StrictMode> */
root.render(
      <BrowserRouter>
      <GridProvider>
        <Routes>
            <Route path="/" element={<App />} >
              <Route index element={<Grid />} />
              <Route path="grid" element={<Grid />} />
              <Route path="payments" element={<Payments />} />
              <Route path="*" element={<Navigate to="/grid" replace />} />
            </Route>
          </Routes>
      </GridProvider>
      </BrowserRouter>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
