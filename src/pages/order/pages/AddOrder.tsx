import {
  Button,
  Container,
  Flex,
  Box,
  FormLabel,
  Input,
  Select,
  Textarea,
  FormControl,
} from '@chakra-ui/react';
import Header from '../../../core/components/Header';
import { useReducer} from 'react';
import { OrderProduct, paymentTypeList, transportTypeList } from '../model/Order';
import { getProducts } from '../api/getProduct';
import { getCustomers } from '../api/getCustomers';
import ProductsTable from '../components/order/ProductsTable';
import OrderResume from '../components/order/OrderResume';
import { AddOrderData } from '../model/AddOrderData';


const initOrder = new AddOrderData({
  customer: 0,
  products: [],
  payment: 0,
  freight: 0,
  transport: 0,
  entry: 0,
  port: '',
  name: '',
  observation: '',
  discount: 0
});

export type OrderActions = {
  update: "customer" | "payment" | "transport"|"freight"|"discount"|"entry",
  value: number
} | {update: "products", value: OrderProduct[]} | {update: "add-product", value: OrderProduct}

const orderDispatcher = (state: AddOrderData, action: OrderActions): AddOrderData => {
  switch (action.update) {
    case "customer":
      return state.copyWith({ customer: action.value });
    case "payment":
      return state.copyWith({ payment: action.value })
    case "transport":
      return state.copyWith({ transport: action.value })
    case "products":
      return state.copyWith({products: action.value})
    case "add-product":
      return state.copyWith({products: [...state.products, action.value]})
    case "discount":
      return state.copyWith({discount: asValue(action.value)})
    case "entry":
      return state.copyWith({entry: asValue(action.value)})
    case "freight":
      return state.copyWith({freight: asValue(action.value)})
  }
}

const asValue = (number: number): number => isNaN(number) ? 0 : number;

export default function AddOrder() {
  const [state, dispatch] = useReducer(orderDispatcher, initOrder);
  const products = getProducts();
  const customers = getCustomers();

  return (
    <form>
      <Header name='Novo pedido' actions={[<Button>Adicionar</Button>]} />
      <Container minW={'container.lg'} pt={8}>
        <Flex gap={6} pt={2}>
          <FormControl>
            <FormLabel>Cliente</FormLabel>
            <Select onChange={(v) => dispatch({ update: "customer", value: Number(v.target.value) })}>
              <option selected={true} disabled={true}>
                Pagamento
              </option>
              {customers.map((c) => (
                <option>{c}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Forma de pagamento</FormLabel>
            <Select onChange={(v) => dispatch({ update: "payment", value: Number(v.target.value) })}>
              <option selected={true} disabled={true}>
                Pagamento
              </option>
              {paymentTypeList.map((p) => (
                <option value={p.code}>{p.label}</option>
              ))}
            </Select>
          </FormControl>
        </Flex>
        <Flex pt={2} gap={8}>
          <Box flex={3}>
            <ProductsTable
              orderProducts={state.products}
              products={products}
              dispatch={dispatch}
            />
          </Box>
          <Box flex={1}>
            <FormControl>
              <FormLabel>Tipo de entrega</FormLabel>
              <Select onChange={(v) => dispatch({update: "transport", value: Number(v.target.value)})} >
                <option disabled={true} selected={true}>
                  Entrega
                </option>
                {transportTypeList.map((type) => {
                  return <option value={type.code}>{type.label}</option>;
                })}
              </Select>
            </FormControl>
            {state.transport !== undefined && state.transport !== 1 ? (
              <FormControl>
                <FormLabel>Valor do frete</FormLabel>
                <Input onChange={(v) => dispatch({update: "freight", value: Number(v.target.value)})} placeholder='valor do frete' />
              </FormControl>
            ) : (
              <></>
            )}
            {state.transport !== undefined && state.transport === 4 ? (
              <FormControl>
                <FormLabel>Nome do porto</FormLabel>
                <Input placeholder='nome do porto' />
              </FormControl>
            ) : (
              <></>
            )}
            {state.transport === 4 || state.transport === 3 ? (
              <FormControl>
                <FormLabel>Nome do barco/entregador</FormLabel>
                <Input placeholder='barco/entregador' />
              </FormControl>
            ) : (
              <></>
            )}
          </Box>
        </Flex>
        <Flex gap={8} pt={2}>
          <FormControl>
            <FormLabel>Entrada</FormLabel>
            <Input placeholder='valor de entrada' onBlur={(e) => dispatch({update: 'entry', value: Number(e.target.value ?? 0)})}/>
          </FormControl>
          <FormControl>
            <FormLabel>Desconto</FormLabel>
            <Input placeholder='valor do desconto' onBlur={(e) => dispatch({update: 'discount', value: Number(e.target.value ?? 0)})} />
            </FormControl>
          </Flex>
          <Flex pt={2}>
            <Textarea placeholder='observações' />
          </Flex>
        <OrderResume order={state} />
      </Container>
    </form>
  );
}
