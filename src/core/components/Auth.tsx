import { useQuery } from '@apollo/client';
import { Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppAction } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import { client } from '../graphql/client';
import Nav from './Nav';

export default function () {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      dispatch({ act: AppAction.logout });
      client.resetStore();
    }
    if (!state.isLogged) {
      navigate('/login');
      return;
    }
  });

  return (
    <>
      <Nav />
      <Container maxW='container.xl' p={4}>
        <Outlet />
      </Container>
    </>
  );
}
