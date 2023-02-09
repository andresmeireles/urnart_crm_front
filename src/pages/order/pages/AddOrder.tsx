import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Text,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  IconButton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import Header from '../../../core/components/Header';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, Fragment, useState } from 'react';
import { OrderProduct, paymentTypeList, TransportType, transportTypeList } from '../model/Order';
import { getProducts } from '../api/getProduct';
import { getCustomers } from '../api/getCustomers';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Md5 } from 'ts-md5';
import ProductsTable from '../components/order/products_table';

const schema = yup
  .object({
    customer: yup.number().required(),
    freight: yup.number().default(0).required(),
    observation: yup.string().notRequired(),
    payment: yup.number().required(),
    transport: yup.number().required(),
    port: yup.string().notRequired(),
    name: yup.string().notRequired(),
    entry: yup.number().notRequired(),
    discount: yup.number().notRequired(),
  })
  .required();
type AddOrderType = yup.InferType<typeof schema>;

export default function AddOrder() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddOrderType>({ resolver: yupResolver(schema) });
  const [transportType, setTransportType] = useState<TransportType>();
  const [prods, setProds] = useState<OrderProduct[]>([]);
  const [selected, setSelected] = useState<string>('');

  const products = getProducts();
  const customers = getCustomers();

  const addProd = (props: { id: number }) => {
    const { id } = props;
    const p = products.find((e) => e.id === id);
    if (p === undefined) {
      return;
    }
    const op = { product: p, amount: 1, price: p.price, hash: Md5.hashStr(p.name) };
    setProds([...prods, op]);
    setSelected('');
  };

  const removeHash = (hash: string) => {
    setProds(prods.filter((p) => p.hash !== hash));
  };

  const updatePrice = (props: { hash: string; price: number }) => {
    const { hash, price } = props;
    const prod = prods.find((p) => p.hash === hash);
    if (prod === undefined) {
      return;
    }
    const nonUpdatedProds = prods.filter((p) => p.hash !== hash);
    const updatedProd = {
      ...prod,
      price: price,
    };
    setProds([...nonUpdatedProds, updatedProd]);
  };

  const updateAmount = (props: { hash: string; amount: number }) => {
    const { hash, amount } = props;
    const prod = prods.find((p) => p.hash === hash);
    if (prod === undefined) {
      return;
    }
    const nonUpdatedProds = prods.filter((p) => p.hash !== hash);
    const updatedProd = {
      ...prod,
      amount: amount,
    };
    setProds([...nonUpdatedProds, updatedProd]);
  };

  return (
    <form>
      <Header name='Novo pedido' actions={[<Button>Adicionar</Button>]} />
      <Container minW={'container.lg'} pt={8}>
        <Flex gap={6} pt={2}>
          <FormControl isInvalid={errors.customer !== undefined}>
            <FormLabel>Cliente</FormLabel>
            <Select {...register('customer')}>
              <option selected={true} disabled={true}>
                Pagamento
              </option>
              {customers.map((c) => (
                <option>{c}</option>
              ))}
            </Select>
            <FormErrorMessage>{errors.customer && errors.customer.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.payment !== undefined}>
            <FormLabel>Forma de pagamento</FormLabel>
            <Select {...register('payment')}>
              <option selected={true} disabled={true}>
                Pagamento
              </option>
              {paymentTypeList.map((p) => (
                <option value={p.code}>{p.label}</option>
              ))}
            </Select>
            <FormErrorMessage>{errors.payment && errors.payment.message}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex pt={2} gap={8}>
          <Box flex={3}>
            <ProductsTable
              removeHash={removeHash}
              orderProducts={prods}
              products={products}
              addProd={addProd}
              selected={selected}
              setSelected={setSelected}
              updatePrice={updatePrice}
              updateAmount={updateAmount}
            />
          </Box>
          <Box flex={1}>
            <FormControl isInvalid={errors.transport !== undefined}>
              <FormLabel>Tipo de entrega</FormLabel>
              <Select
                {...register('transport')}
                onChange={(value: ChangeEvent<HTMLSelectElement>) => {
                  const t = transportTypeList.find(
                    (tt) => tt.code === Number(value.currentTarget.value),
                  );
                  setTransportType(t);
                }}
              >
                <option disabled={true} selected={true}>
                  Entrega
                </option>
                {transportTypeList.map((type) => {
                  return <option value={type.code}>{type.label}</option>;
                })}
              </Select>
              <FormErrorMessage>{errors.transport && errors.transport.message}</FormErrorMessage>
            </FormControl>
            {transportType !== undefined && transportType.code !== 1 ? (
              <FormControl isInvalid={errors.freight !== undefined}>
                <FormLabel>Valor do frete</FormLabel>
                <Input placeholder='valor do frete' {...register('freight')} />
                <FormErrorMessage>{errors.freight && errors.freight.message}</FormErrorMessage>
              </FormControl>
            ) : (
              <></>
            )}
            {transportType !== undefined && transportType.code === 4 ? (
              <FormControl isInvalid={errors.port !== undefined}>
                <FormLabel>Nome do porto</FormLabel>
                <Input placeholder='nome do porto' {...register('port')} />
                <FormErrorMessage>{errors.freight && errors.freight.message}</FormErrorMessage>
              </FormControl>
            ) : (
              <></>
            )}
            {transportType !== undefined &&
            (transportType.code === 4 || transportType.code === 3) ? (
              <FormControl isInvalid={errors.freight !== undefined}>
                <FormLabel>Nome do barco/entregador</FormLabel>
                <Input placeholder='barco/entregador' {...register('name')} />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>
            ) : (
              <></>
            )}
          </Box>
        </Flex>
        <Flex gap={8} pt={2}>
          <FormControl isInvalid={errors.entry !== undefined}>
            <FormLabel>Entrada</FormLabel>
            <Input placeholder='valor de entrada' {...register('entry')} />
            <FormErrorMessage>{errors.entry && errors.entry.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.discount !== undefined}>
            <FormLabel>Desconto</FormLabel>
            <Input placeholder='valor do desconto' {...register('discount')} />
            <FormErrorMessage>{errors.discount && errors.discount.message}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex pt={2}>
          <Textarea {...register('observation')} placeholder='observações' />
        </Flex>
        <Flex pt={2}>
          <Text>Valor total:</Text>
        </Flex>
        <Flex pt={2}>
          <Text>Total de produtos</Text>
        </Flex>
        <Flex pt={2}>
          <Text>Valor total do pedido:</Text>
        </Flex>
      </Container>
    </form>
  );
}
