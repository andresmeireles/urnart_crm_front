import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Input, Select, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import Product from '../../../products/model/Product';
import { OrderProduct } from '../../model/Order';

export default function ProductsTable(props: {
  products: Product[];
  orderProducts: OrderProduct[];
  removeHash: (hash: string) => void;
  selected: string;
  setSelected: (arg: string) => void;
  addProd: (props: { id: number }) => void;
  updatePrice: (props: { hash: string; price: number }) => void;
  updateAmount: (props: { hash: string; amount: number }) => void;
}) {
  const {
    orderProducts,
    updatePrice,
    updateAmount,
    products,
    removeHash,
    selected,
    setSelected,
    addProd,
  } = props;

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
          onClick={() => addProd({ id: Number(selected) })}
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
                      onClick={() => removeHash(p.hash)}
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
