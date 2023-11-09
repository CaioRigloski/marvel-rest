import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import App from './App'
import Authenticate from './components/Authenticate'
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Authenticate/>
  },
  {
    path: '/characters',
    element: <App/>,
  },
  {
    path: '/authenticate',
    element: <Authenticate/>
  },
])

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CookiesProvider>
        <RouterProvider router={router}/>
    </CookiesProvider>
  </React.StrictMode>
)