import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListEventos from './pages/lisitevento/listaEventos.jsx'
import EditEventos from './pages/editevento/editEvento.jsx'
import AddEventos from  './pages/addevento/addEvento.jsx'

const pages = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {path: '/', element: <ListEventos />},
        {path: '/edit/:id', element: <EditEventos />},
        {path: '/add', element: <AddEventos />},
      ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={pages}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
