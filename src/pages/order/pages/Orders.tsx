import { Button, Container } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../core/components/Header';
import getOrders from '../api/getOrders';

export default function Orders() {
  const navigate = useNavigate();
  const orders = getOrders();
  const [search, setSearch] = useState('');

  const filteredList = orders.filter((o) => o);

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
