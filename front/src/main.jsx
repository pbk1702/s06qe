import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { createBrowserRouter, Route, RouterProvider } from 'react-router'


import Layout from '@/page/Layout.jsx';
import Main from '@/page/Main.jsx';
import Products from '@/page/Products.jsx';
import Order from '@/page/Order.jsx';
import Events from '@/page/Events.jsx';
import Contacts from '@/page/Contacts.jsx';

const routes = [
  { 
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Main },      
      { path: "products", Component: Products },
      { path: "order", Component: Order },
      { path: "events", Component: Events },
      { path: "contacts", Component: Contacts },
    ],
  }
]

const router = createBrowserRouter( routes );


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={ router } />
  </StrictMode>,
)
