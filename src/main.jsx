/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Node modules */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


/* Components */
import App from './App.jsx';

/* CSS */
import './index.css';
import 'lenis/dist/lenis.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
     {/* <App /> */}
     <Routes>
      <Route path="*" element={<App />} />
     </Routes>
   </BrowserRouter>
  </StrictMode>,
)
