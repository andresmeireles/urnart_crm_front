import { createBrowserRouter } from 'react-router-dom';
import Auth from './core/components/Auth';
import Login from './features/auth/pages/Login';
import Customer from './features/customers/Customer';
import AddCustomer from './features/customers/pages/AddCustomer';
import Home from './features/home/Home';
import AddOrder from './features/order/pages/AddOrder';
import Orders from './features/order/pages/Orders';
import AddProduct from './features/products/pages/AddProduct';
import Products from './features/products/Products';
import Exit from './features/reports/pages/Exit';
import List from './features/reports/pages/List';
import Tag from './features/reports/pages/Tag';

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
        { path: 'order', element: <Orders /> },
        { path: 'order/add', element: <AddOrder /> },
        { path: 'report', element: <List /> },
        { path: 'report/tag', element: <Tag /> },
        { path: 'report/exit', element: <Exit /> },
      ],
    },
  ]);
