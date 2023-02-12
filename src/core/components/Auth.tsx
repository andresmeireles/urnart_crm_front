import { Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Nav from './Nav';

export default function () {
  const { state } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLogged) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Nav />
      <Container maxW='container.xl' p={4}>
        <Outlet />
      </Container>
    </>
  );
}
