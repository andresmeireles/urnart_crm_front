import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Container,
  Flex,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import Header from '../../../core/components/Header';
import tag, { TagInterface } from '../pdfs/tags';

export default function Tag() {
  const toast = useToast();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [amount, setAmount] = useState(0);
  const [single, setSingle] = useState(true);
  const [tags, setTags] = useState<TagInterface[]>([]);

  const remove = (hash: string) => {
    setTags(tags.filter((t) => t.hash !== hash));
  };

  const add = () => {
    if (name.trim().length === 0) {
      message('nome precisa ser preenchido', { status: 'error' });
      return;
    }
    if (city.trim().length === 0) {
      message('cidade precisa ser preenchido', { status: 'error' });
      return;
    }
    if (amount < 1) {
      message('quantidade precisa ser pelo menos 1', { status: 'error' });
      return;
    }
    const tag = {
      name,
      amount,
      city,
      single,
      hash: new Date().getTime().toString(),
    };
    setName('');
    setCity('');
    setAmount(0);
    setSingle(true);
    setTags([...tags, tag]);
  };

  const message = (message: string, props: { status?: 'error' | 'success' }) => {
    toast({
      title: message,
      position: 'top-right',
      duration: 2000,
      status: props.status ?? 'success',
    });
  };

  const changeAmount = (amount: number) => {
    if (isNaN(amount)) return;
    if (amount < 0) return;
    setAmount(amount);
  };

  return (
    <>
      <Header name='Etiquetas' />
      <Container minW={'container.lg'} mt={6}>
        <Flex>
          <Button onClick={() => tag({ tags })} width={{ base: '100%' }} colorScheme={'green'}>
            Criar
          </Button>
        </Flex>
        <Flex gap={3} mt={8}>
          <Input value={name} placeholder='cliente' onChange={(v) => setName(v.target.value)} />
          <Input value={city} placeholder='cidade' onChange={(v) => setCity(v.target.value)} />
          <NumberInput value={amount} min={0} onChange={(_, v) => changeAmount(v)}>
            <NumberInputField
              value={amount}
              onChange={(v) => changeAmount(Number(v.target.value))}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Checkbox isChecked={!single} onChange={() => setSingle(!single)}>
            Casado
          </Checkbox>
          <IconButton
            aria-label={'add-item'}
            bg={'green.200'}
            _hover={{ bg: 'green.300' }}
            onClick={add}
            icon={<AddIcon />}
          />
        </Flex>
        <Table mt={6}>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Cidade</Th>
              <Th>Quantidade</Th>
              <Th>Casado</Th>
              <Th>Açoes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tags.map((t) => (
              <Tr key={t.hash}>
                <Td>{t.name}</Td>
                <Td>{t.city}</Td>
                <Td>{t.amount}</Td>
                <Td>{t.single ? '' : 'Sim'}</Td>
                <Td>
                  <IconButton
                    bg='red.200'
                    onClick={() => remove(t.hash)}
                    icon={<CloseIcon />}
                    aria-label={'remove'}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </>
  );
}
