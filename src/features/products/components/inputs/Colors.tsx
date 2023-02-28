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
import { ChangeEvent } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { AddProductType } from '../../pages/AddProduct';
import AddColor from '../adds/AddColor';
import AddModel from '../adds/AddModel';
import ModelModal from '../modals/ModelModal';

export default function (props: {
  register: UseFormRegister<AddProductType>;
  errors: FieldErrors<AddProductType>;
  setValue: UseFormSetValue<AddProductType>;
}) {
  const { register, errors, setValue } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        ></Select>
        <IconButton
          aria-label={'add color'}
          colorScheme='green'
          onClick={onOpen}
          icon={<AddIcon />}
        />
      </Flex>
      <ModelModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        body={<AddColor onClose={onClose} />}
        title={'Adicionar modelo'}
      />
      <FormErrorMessage>{errors.color && errors.color.message}</FormErrorMessage>
    </FormControl>
  );
}
