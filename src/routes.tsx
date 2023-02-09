import { createBrowserRouter } from 'react-router-dom';
import { useAppContext } from './core/context/AppContext';
import Login from './pages/auth/pages/Login';
import Customer from './pages/customers/Customer';
import AddCustomer from './pages/customers/pages/AddCustomer';
import Home from './pages/home/Home';
import AddProduct from './pages/products/pages/AddProduct';
import Products from './pages/products/Products';
import Auth from './Auth';
import AddOrder from './pages/order/pages/AddOrder';

export default () =>
  createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/signin', element: <Login /> },
    {
      path: '/',
      element: <Auth />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'customer',
          element: <Customer />,
        },
        { path: 'customer/add', element: <AddCustomer /> },
        {
          path: 'product',
          element: <Products />,
        },
        { path: 'product/add', element: <AddProduct /> },
        { path: 'order/add', element: <AddOrder /> },
      ],
    },
  ]);
