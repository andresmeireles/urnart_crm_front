import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Center,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../core/components/Header';
import Get from './api/Get';
import Product from './model/Product';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const get = new Get();
    setProducts(get.all());
  }, []);

  return (
    <>
      <Header
        name='Produtos'
        actions={[
          <Button bg='blue.300' onClick={() => navigate('/product/add')}>
            Adicionar
          </Button>,
        ]}
      />
      <Container maxW='container.lg'>
        <Flex my={10}>
          <InputGroup>
            <InputLeftElement
              children={<SearchIcon boxSize={'5'} color={'gray.200'} />}
              pointerEvents='none'
            />
            <Input placeholder='buscar' size={'lg'} />
          </InputGroup>
        </Flex>
        <TableContainer mt={10}>
          <Table>
            <Thead>
              <Tr>
                <Th>
                  <Center>Id</Center>
                </Th>
                <Th>
                  <Center>Nome</Center>
                </Th>
                <Th>
                  <Center>Preço</Center>
                </Th>
                <Th>
                  <Center>Ações</Center>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((p) => (
                <Tr>
                  <Td>
                    <Center>{p.id}</Center>
                  </Td>
                  <Td>
                    <Center>{p.name}</Center>
                  </Td>
                  <Td>
                    <Center>{p.formattedPrice}</Center>
                  </Td>
                  <Td>
                    <Flex alignSelf={'center'} alignContent='flex-start' gap={4}>
                      <Button bg={'orange.300'} flex={1}>
                        Editar
                      </Button>
                      <Button bg='red.300' flex={1}>
                        Remover
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
