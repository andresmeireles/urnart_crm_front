import {
  Text,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
  Thead,
  Td,
  Table,
  Tr,
  Tbody,
  Tfoot,
} from '@chakra-ui/react';
import { exit } from 'process';
import { useReducer, useState } from 'react';
import Header from '../../../core/components/Header';
import { ExitItem } from '../model/Exit';
import { exitTravel } from '../pdfs/exit';
import { exitBoarding } from '../pdfs/exit-load';

type ExitActions =
  | { action: 'name' | 'city' | 'payment'; value: string }
  | { action: 's' | 'm' | 'b' | 'order' | 'freight' | 'sort'; value: number }
  | { action: 'single'; value: boolean }
  | { action: 'reset' };

const exitDispatcher = (state: ExitItem, event: ExitActions) => {
  const { action } = event;
  switch (action) {
    case 'payment':
      return state.copyWith({ payment: event.value });
    case 'name':
      return state.copyWith({ name: event.value });
    case 'single':
      return state.copyWith({ single: event.value });
    case 'city':
      return state.copyWith({ city: event.value });
    case 'freight':
      return state.copyWith({ freight: event.value });
    case 'sort':
      return state.copyWith({ sort: event.value });
    case 's':
      return state.copyWith({ s: event.value });
    case 'm':
      return state.copyWith({ m: event.value });
    case 'b':
      return state.copyWith({ b: event.value });
    case 'order':
      return state.copyWith({ order: event.value });
    case 'reset':
      return init;
  }
};

const init = new ExitItem({
  payment: '',
  name: '',
  city: '',
  single: true,
  sort: 0,
  freight: 0,
  order: 0,
  s: 0,
  m: 0,
  b: 0,
});

export default function Exit() {
  const toast = useToast();
  const [state, dispatch] = useReducer(exitDispatcher, init);
  const [items, setItems] = useState<ExitItem[]>([]);

  const toValue = (value: string) => {
    const v = Number(value);
    if (isNaN(v)) {
      return 0;
    }
    return v;
  };

  const add = () => {
    if (typeof state.isValid() === 'string') {
      toast({ title: state.isValid(), position: 'top-right', duration: 2000 });
      return;
    }
    setItems([...items, state.copyWith({ sort: items.length + 1 })]);
    dispatch({ action: 'reset' });
  };

  const report = (type: 'boarding' | 'exiting') => {
    if (items.length === 0) {
      toast({
        title: 'relatorio não pode ser gerado vazio',
        position: 'top-right',
        status: 'error',
      });
      return;
    }
    if (type === 'boarding') {
      exitBoarding(items);
      return;
    }
    exitTravel(items);
    return;
  };

  return (
    <>
      <Header name='Relatório de saída' />
      <Container mt={8} minW={'container.lg'}>
        <Flex gap={3}>
          <Button
            colorScheme={'whatsapp'}
            width={{ base: '100%' }}
            onClick={() => report('boarding')}
          >
            Criar relatorio de embarque
          </Button>
          <Button colorScheme={'green'} width={{ base: '100%' }} onClick={() => report('exiting')}>
            Criar relatório de saída
          </Button>
          {/* <Button colorScheme={'green'} width={{ base: '100%' }}> */}
          {/*   Criar relatório */}
          {/* </Button> */}
        </Flex>
        <Box gap={3} mt={8}>
          <Flex gap={3}>
            <Input
              placeholder='cliente'
              value={state.name}
              onChange={(v) => dispatch({ action: 'name', value: v.target.value })}
            />
            <Input
              placeholder='cidade'
              value={state.city}
              onChange={(v) => dispatch({ action: 'city', value: v.target.value })}
            />
          </Flex>
          <Flex mt={4} gap={3}>
            <FormControl>
              <FormLabel>Forma de pagamento</FormLabel>
              <Input
                placeholder='forma de pagamento'
                value={state.payment}
                onChange={(v) => dispatch({ action: 'payment', value: v.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Valor do frete</FormLabel>
              <Input
                value={state.freight}
                onChange={(v) => dispatch({ action: 'freight', value: Number(v.target.value) })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Valor do pedido</FormLabel>
              <Input
                value={state.order}
                onChange={(v) => dispatch({ action: 'order', value: Number(v.target.value) })}
              />
            </FormControl>
          </Flex>
          <Flex gap={3} mt={4}>
            <FormControl>
              <FormLabel>Grandes</FormLabel>
              <NumberInput
                value={state.b}
                onChange={(e, v) => dispatch({ action: 'b', value: Number(e) })}
              >
                <NumberInputField
                  value={state.b}
                  onChange={(v) => dispatch({ action: 'b', value: toValue(v.target.value) })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Medias</FormLabel>
              <NumberInput
                value={state.m}
                onChange={(v, _) => dispatch({ action: 'm', value: toValue(v) })}
              >
                <NumberInputField
                  value={state.m}
                  onChange={(v) => dispatch({ action: 'm', value: toValue(v.target.value) })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Pequenas</FormLabel>
              <NumberInput
                value={state.s}
                onChange={(v, _) => dispatch({ action: 's', value: toValue(v) })}
              >
                <NumberInputField
                  value={state.s}
                  onChange={(v) => dispatch({ action: 's', value: toValue(v.target.value) })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>&nbsp;</FormLabel>
              <Checkbox
                isChecked={!state.single}
                onChange={() => dispatch({ action: 'single', value: !state.single })}
              >
                <Text fontSize={'2xl'}>Casado</Text>
              </Checkbox>
            </FormControl>
          </Flex>
          <Flex mt={8}>
            <Button onClick={add} width={{ base: '100%' }} colorScheme='blue'>
              Adicionar item
            </Button>
          </Flex>
        </Box>
      </Container>
      <Container minW={'container.lg'} mt={8} pb={12}>
        <Table variant={'striped'}>
          <Thead>
            <Tr>
              <Td>N</Td>
              <Td>Nome</Td>
              <Td>Cidade</Td>
              <Td>G</Td>
              <Td>P</Td>
              <Td>S</Td>
              <Td>Total</Td>
              <Td>Casado</Td>
              <Td>Forma Pgto.</Td>
              <Td>Frete</Td>
              <Td>Pedido</Td>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => {
              return (
                <Tr>
                  <Td>{item.sort}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.city}</Td>
                  <Td>{item.b}</Td>
                  <Td>{item.m}</Td>
                  <Td>{item.s}</Td>
                  <Td>{item.s + item.m + item.b}</Td>
                  <Td>{item.single ? 'Nao' : 'Sim'}</Td>
                  <Td>{item.payment}</Td>
                  <Td>{item.freight}</Td>
                  <Td>{item.order}</Td>
                </Tr>
              );
            })}
          </Tbody>
          {items.length !== 0 ? (
            <Tfoot>
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>{items.reduce((p, c) => p + c.b, 0)}</Td>
                <Td>{items.reduce((p, c) => p + c.m, 0)}</Td>
                <Td>{items.reduce((p, c) => p + c.s, 0)}</Td>
                <Td>{items.reduce((p, c) => p + c.totalAmount(), 0)}</Td>
                <Td></Td>
                <Td></Td>
                <Td>{items.reduce((p, c) => p + c.freight, 0)}</Td>
                <Td>{items.reduce((p, c) => p + c.order, 0)}</Td>
              </Tr>
            </Tfoot>
          ) : (
            <></>
          )}
        </Table>
      </Container>
    </>
  );
}
