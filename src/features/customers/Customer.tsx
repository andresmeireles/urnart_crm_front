import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from '../../core/components/Header';

export default function Customer() {
  const navigate = useNavigate();
  return (
    <>
      <Header
        name='Clientes'
        actions={[<Button onClick={() => navigate('/customer/add')}>Adicionar</Button>]}
      />
    </>
  );
}
