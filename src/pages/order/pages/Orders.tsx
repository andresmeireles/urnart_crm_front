import { Button, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../core/components/Header';

export default function Orders() {
  const navigate = useNavigate();
  return (
    <>
      <Header
        name='Pedidos'
        actions={[
          <Button onClick={() => navigate('/order/add')} bg='green.200'>
            Novo pedido
          </Button>,
        ]}
      />
    </>
  );
}
