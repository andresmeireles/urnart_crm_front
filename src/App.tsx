import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { RouterProvider, useNavigate } from 'react-router-dom';
import { AppAction } from './core/context/AppActions';
import { useAppContext } from './core/context/AppContext';
import { getUser } from './features/auth/graphql/query/user';
import routes from './routes';

const router = routes();

export default function App() {
  return <RouterProvider router={router} />;
}
