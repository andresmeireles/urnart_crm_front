import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Nav from './core/components/Nav';

export default function () {
  return (
    <>
      <Nav />
      <Container maxW='container.xl' p={4}>
        <Outlet />
      </Container>
    </>
  );
}
