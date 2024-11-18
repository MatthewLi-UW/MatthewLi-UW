/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Node modules */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BrowserRouter from 'react-router-dom'


/* Components */
import App from './App.jsx';

/* CSS */
import './index.css';
import 'lenis/dist/lenis.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
     <App />
   </BrowserRouter>
  </StrictMode>,
)
