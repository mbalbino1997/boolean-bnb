import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='d-flex viewport'>
      <BrowserRouter>

        <App />
      </BrowserRouter>

    </div>
  </StrictMode>,
)
