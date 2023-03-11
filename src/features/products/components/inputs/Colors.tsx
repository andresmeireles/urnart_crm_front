import { AddIcon } from '@chakra-ui/icons';
import {
  Text,
  FormControl,
  Flex,
  Select,
  IconButton,
  FormErrorMessage,
  useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { client } from '../../../../core/graphql/client';
import { colorQuery } from '../../graphql/query';
import { ProductOptsInterface } from '../../model/Interfaces';
import { AddProductType } from '../../pages/AddProduct';
import AddColor from '../adds/AddColor';
import ModelModal from '../modals/ModelModal';

export default function (props: {
  register: UseFormRegister<AddProductType>;
  errors: FieldErrors<AddProductType>;
  setValue: UseFormSetValue<AddProductType>;
}) {
  const { register, errors, setValue } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [colors, setColors] = useState<ProductOptsInterface[]>([]);

  const getColors = async () => {
    const { error, data } = await client.query({
      query: colorQuery(),
      fetchPolicy: 'network-only',
    });
    if (error !== undefined) {
      setColors([]);
      return;
    }
    if (data !== undefined) {
      const colors = data!.colors.map((color) => ({
        id: color.id,
        name: color.name,
      }));
      setColors(colors);
      return;
    }
    setColors([]);
    return;
  };

  useEffect(() => {
    getColors().catch(console.error);
  }, []);

  const closeAction = async () => {
    await getColors();
    onClose();
  };

  return (
    <FormControl isInvalid={errors.color !== undefined}>
      <Text>Cor</Text>
      <Flex gap={2}>
        <Select
          placeholder='Cor'
          {...register('color')}
          onChange={(v: ChangeEvent<HTMLSelectElement>) =>
            setValue('color', Number(v.currentTarget.value))
          }
        >
          {colors.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </Select>
        <IconButton
          aria-label={'add color'}
          colorScheme='green'
          onClick={onOpen}
          icon={<AddIcon />}
        />
      </Flex>
      <ModelModal
        isOpen={isOpen}
        onClose={closeAction}
        body={<AddColor onClose={closeAction} />}
        title={'Adicionar modelo'}
      />
      <FormErrorMessage>{errors.color && errors.color.message}</FormErrorMessage>
    </FormControl>
  );
}
