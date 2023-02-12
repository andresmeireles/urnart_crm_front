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
} from '@chakra-ui/react';
import { useReducer, useState } from 'react';
import Header from '../../../core/components/Header';
import { ExitInterface } from '../model/Exit';

type ExitActions =
  | { action: 'name' | 'city' | 'payment'; value: string }
  | { action: 's' | 'm' | 'b' | 'freight' | 'sort'; value: number }
  | { action: 'single'; value: boolean }
  | { action: 'reset' };

class ExitItem {
  public readonly city: string;
  public readonly name: string;
  public readonly payment: string;
  public readonly b: number;
  public readonly m: number;
  public readonly s: number;
  public readonly freight: number;
  public readonly sort: number;
  public readonly single: boolean;
  public readonly hash: string;

  constructor(props: ExitInterface) {
    const { name, city, payment, s, m, b, freight, sort, single } = props;
    this.name = name;
    this.payment = payment;
    this.city = city;
    this.freight = freight;
    this.b = b;
    this.m = m;
    this.s = s;
    this.sort = sort;
    this.single = single;
    this.hash = new Date().getTime().toString();
  }

  isValid(): boolean | string {
    if (this.s < 0 || this.m < 0 || this.b < 0) {
      return 'nenhuma quantidade pode ser menor que zero';
    }
    if (this.s === 0 && this.m === 0 && this.b === 0) {
      return 'um produto tem de ser maior que zero';
    }
    if (
      this.payment.trim().length === 0 ||
      this.name.trim().length === 0 ||
      this.city.trim().length === 0
    ) {
      return 'forma de pagamento/nome/cidade nao pode ser vazio';
    }
    return true;
  }

  copyWith(props: {
    name?: string;
    city?: string;
    b?: number;
    m?: number;
    s?: number;
    sort?: number;
    freight?: number;
    payment?: string;
    single?: boolean;
  }) {
    const { name, city, payment, s, m, b, freight, sort, single } = props;
    return new ExitItem({
      name: name ?? this.name,
      city: city ?? this.city,
      b: b ?? this.b,
      m: m ?? this.m,
      s: s ?? this.s,
      sort: sort ?? this.sort,
      freight: freight ?? this.freight,
      payment: payment ?? this.payment,
      single: single ?? this.single,
    });
  }
}

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
    dispatch({ action: 'sort', value: items.length + 1 });
    setItems([...items, state]);
    dispatch({ action: 'reset' });
  };

  return (
    <>
      <Header name='Relatório de saída' />
      <Container mt={8} minW={'container.lg'}>
        <Button colorScheme={'green'} width={{ base: '100%' }}>
          Criar relatório
        </Button>
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
          <Flex gap={3} mt={4}>
            <FormControl>
              <FormLabel>Grandes</FormLabel>
              <NumberInput value={state.b} onChange={(_, v) => dispatch({ action: 'b', value: v })}>
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
              <NumberInput value={state.m} onChange={(_, v) => dispatch({ action: 'm', value: v })}>
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
              <NumberInput value={state.s} onChange={(_, v) => dispatch({ action: 's', value: v })}>
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
      <Container mt={8}>
        <Table>
          <Thead>
            <Tr>
              <Td>N</Td>
              <Td>Nome</Td>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => {
              return (
                <Tr>
                  <Td>{item.sort}</Td>
                  <Td>{item.name}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Container>
    </>
  );
}
