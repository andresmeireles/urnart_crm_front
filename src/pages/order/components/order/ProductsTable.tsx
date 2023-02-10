import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Input, Select, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Dispatch, useState } from 'react';
import { Md5 } from 'ts-md5';
import Product from '../../../products/model/Product';
import { OrderProduct } from '../../model/Order';
import { OrderActions } from '../../pages/AddOrder';

export default function ProductsTable(props: {
  products: Product[];
  orderProducts: OrderProduct[];
  dispatch: Dispatch<OrderActions>
}) {
  const {
    orderProducts,
    products,
    dispatch
  } = props;

  const [selected, setSelected] = useState('');

  const addProduct = () => {
    const product = products.find((op) => op.id === Number(selected));
    if (product === undefined) return;
    const op = { product: product, amount: 1, price: product.price, hash: Md5.hashStr(`${product.id}${product.name}`) };
    dispatch({ update: "add-product", value: op })
  }

  const updatePrice = (props: { hash: string, price: number }) => {
    const { hash, price } = props;
    const product = orderProducts.find((op) => op.hash === hash);
    if (product === undefined) return;
    product.price = price;
    const removeProd = orderProducts.filter((op) => op.hash !== hash);
    dispatch({ update: "products", value: [...removeProd, product] })
  }

  const updateAmount = (props: { hash: string, amount: number }) => {
    const { hash, amount } = props;
    const product = orderProducts.find((op) => op.hash === hash);
    if (product === undefined) return;
    product.amount = amount;
    const removeProd = orderProducts.filter((op) => op.hash !== hash);
    dispatch({ update: "products", value: [...removeProd, product] })
  }

  return (
    <>
      <Flex gap={2}>
        <Select value={selected} onChange={(v) => setSelected(v.currentTarget.value)}>
          <option value={''} disabled selected>
            Produto
          </option>
          {products.map((p) => {
            const isDisabled = orderProducts.find((op) => op.product.id === p.id) !== undefined;
            return (
              <option disabled={isDisabled} value={`${p.id}`}>
                {p.name}
              </option>
            );
          })}
        </Select>
        <IconButton
          icon={<AddIcon />}
          aria-label={'add button'}
          onClick={addProduct}
        />
      </Flex>
      {orderProducts.length !== 0 ? (
        <Table>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Preço</Th>
              <Th>Quantidade</Th>
              <Th>Total</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderProducts.map((p) => {
              return (
                <Tr key={p.hash}>
                  <Td>{p.product.name}</Td>
                  <Td>
                    <Input
                      defaultValue={p.price}
                      onBlur={(e) => updatePrice({ hash: p.hash, price: Number(e.target.value) })}
                    />
                  </Td>
                  <Td>
                    <Input
                      defaultValue={p.amount}
                      onBlur={(e) => updateAmount({ hash: p.hash, amount: Number(e.target.value) })}
                    />
                  </Td>
                  <Td>
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      p.amount * p.price,
                    )}
                  </Td>
                  <Td>
                    <IconButton
                      onClick={() => dispatch({update: 'products', value: orderProducts.filter((op) => op.hash !== p.hash)})}
                      bg={'red.400'}
                      _hover={{
                        bg: 'red.500',
                      }}
                      icon={<CloseIcon color={'white'} />}
                      aria-label={'remove icon'}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      ) : (
        <></>
      )}
    </>
  );
}
