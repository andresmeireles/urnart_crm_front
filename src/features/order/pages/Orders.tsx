import { AddIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../core/components/Header';
import tag from '../../reports/pdfs/tags';
import getOrders from '../api/getOrders';
import EditMode from '../components/order/EditMode';

export default function Orders() {
  const navigate = useNavigate();
  const orders = getOrders();
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredList = orders.filter((o) => o.customer.tradeName.indexOf(search) !== -1);

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
      <Container minW={'container.lg'} mt={8}>
        <FormControl>
          <Input placeholder='Buscar pedidos' onChange={(e) => setSearch(e.target.value)} />
        </FormControl>
        <Table mt={8}>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Cliente</Th>
              <Th>Atualizado Em</Th>
              <Th>Transporte</Th>
              <Th>Entregador</Th>
              <Th>Frete</Th>
              <Th>
                <Center>Ações</Center>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredList.map((order) => {
              return (
                <Tr>
                  <Td>{order.id}</Td>
                  <Td>{order.customer.tradeName}</Td>
                  <Td>{order.updatedAt.toDateString()}</Td>
                  <Td>{order.transport}</Td>
                  <Td>
                    {order.name}
                    {order.port !== undefined ? '/' : ''}
                    {order.port ?? ''}
                  </Td>
                  <Td>
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      order.freight,
                    )}
                  </Td>
                  <Td>
                    <Flex gap={3} justify='center'>
                      <IconButton bg='yellow.200' aria-label='edit-order' icon={<EditIcon />} />
                      <IconButton
                        bg='aqua'
                        aria-label='change mode'
                        onClick={onOpen}
                        icon={<ExternalLinkIcon />}
                      />
                      <EditMode onClose={onClose} isOpen={isOpen} id={order.id} mode={order.mode} />
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Container>
    </>
  );
}
