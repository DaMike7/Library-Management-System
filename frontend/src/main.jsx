import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { createBrowserRouter , RouterProvider } from 'react-router';
import './index.css'
import App from './App.jsx'

import ErrorPage from './pages/Errorpage.jsx';
import LibraryDashboard from './pages/Dashboard.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/dashboard',
    element: <LibraryDashboard />
  },
  {
    path: '*',
    element: <ErrorPage/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)