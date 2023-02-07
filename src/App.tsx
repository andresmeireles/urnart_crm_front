import { Container } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Nav from './core/components/Nav';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import routes from './routes';

const router = routes();

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
