import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppProvider from './core/context/AppContext';
import routes from './routes';

const router = routes();

export default function App() {
  return <RouterProvider router={router} />;
}
