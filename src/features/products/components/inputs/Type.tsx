import { AddIcon } from '@chakra-ui/icons';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { client } from '../../../../core/graphql/client';
import { typesQuery } from '../../graphql/query';
import { ProductOptsInterface } from '../../model/Interfaces';
import { AddProductType } from '../../pages/AddProduct';
import AddType from '../adds/AddType';
import ModelModal from '../modals/ModelModal';

export default function (props: {
  register: UseFormRegister<AddProductType>;
  errors: FieldErrors<AddProductType>;
  setValue: UseFormSetValue<AddProductType>;
}) {
  const { errors, register, setValue } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [types, setTypes] = useState<ProductOptsInterface[]>([]);

  const getTypes = async () => {
    const { error, data } = await client.query({
      query: typesQuery(),
      fetchPolicy: 'network-only',
    });
    if (error !== undefined) {
      setTypes([]);
      return;
    }
    if (data !== undefined) {
      const types = data!.types.map((types) => ({
        id: types.id,
        name: types.name,
      }));
      setTypes(types);
      return;
    }
    setTypes([]);
    return;
  };

  useEffect(() => {
    getTypes().catch(console.error);
  }, []);

  const closeAction = async () => {
    await getTypes();
    onClose();
  };

  return (
    <FormControl isInvalid={errors.type !== undefined}>
      <Text>Tipo</Text>
      <Flex gap={2}>
        <Select
          placeholder='tipo'
          {...register('type')}
          onChange={(v: ChangeEvent<HTMLSelectElement>) =>
            setValue('model', Number(v.currentTarget.value))
          }
        >
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </Select>
        <IconButton
          aria-label={'add type'}
          colorScheme='green'
          onClick={onOpen}
          icon={<AddIcon />}
        />
        <ModelModal
          isOpen={isOpen}
          onClose={closeAction}
          body={<AddType onClose={closeAction} />}
          title={'Adicionar modelo'}
        />
      </Flex>
      <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
    </FormControl>
  );
}
