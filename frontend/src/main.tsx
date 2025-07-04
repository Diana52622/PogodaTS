import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import { AdminPanel } from './components/AdminPanel'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: 'admin', 
    element: <AdminPanel />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)