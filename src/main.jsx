import { createRoot } from 'react-dom/client';
import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './components/Home/home'
import SignIn from './components/Authentication/signIn'
import SignUp from './components/Authentication/signup'
import Product from './components/Product/product';

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
        path: '/product',
        element: <Product />
      },
      {
        path: '/login',
        element: <SignIn />
      },
      {
        path: '/register',
        element: <SignUp />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
