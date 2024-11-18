/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Node modules */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BrowserRouter from 'react-router-dom/BrowserRouter'


/* Components */
import App from './App.jsx';

/* CSS */
import './index.css';
import 'lenis/dist/lenis.css'


createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>,
)

// ReactDOM.render((
//    <BrowserRouter basename={process.env.PUBLIC_URL}>
//      <App />
//    </BrowserRouter>
// ), ...)