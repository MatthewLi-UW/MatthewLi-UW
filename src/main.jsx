import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {import.meta.env.VITE_VERCEL_HOSTED && <Analytics />}
    {import.meta.env.VITE_VERCEL_HOSTED && <SpeedInsights />}
  </StrictMode>,
)
