import { createBrowserRouter } from 'react-router-dom';
import Customer from './pages/customers/Customer';
import AddCustomer from './pages/customers/pages/AddCustomer';
import Home from './pages/home/Home';
import AddProduct from './pages/products/pages/AddProduct';
import Products from './pages/products/Products';
import Root from './Root';

export default () =>
  createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        { path: 'customer', element: <Customer /> },
        { path: 'customer/add', element: <AddCustomer /> },
        {
          path: 'product',
          element: <Products />,
        },
        { path: 'product/add', element: <AddProduct /> },
      ],
    },
    //   {
    //     path: '/product',
    //     element: <Products />,
    //     children: [
    //       {
    //         path: '/add',
    //         element: <AddProduct />,
    //       },
    //     ],
    //   },
  ]);
