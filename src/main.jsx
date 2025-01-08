import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import CreateProduct from './components/Admin/createProduct'
import CreateProductCategory from './components/Admin/createProductCategory'
import Home from './components/Home/home'
import SignIn from './components/Authentication/signIn'
import SignUp from './components/Authentication/signup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/login',
        element: <SignIn />
      },
      {
        path: '/register',
        element: <SignUp />
      },
      {
        path: '/create-product',
        element: <CreateProduct />
      },
      {
        path: '/create-product-category',
        element: <CreateProductCategory />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
