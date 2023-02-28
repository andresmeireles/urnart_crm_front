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
import { ChangeEvent } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
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

  return (
    <FormControl isInvalid={errors.type !== undefined}>
      <Text>
        Tipo<span style={{ color: 'red' }}>*</span>
      </Text>
      <Flex gap={2}>
        <Select
          placeholder='tipo'
          {...register('type')}
          onChange={(v: ChangeEvent<HTMLSelectElement>) =>
            setValue('model', Number(v.currentTarget.value))
          }
        ></Select>
        <IconButton
          aria-label={'add type'}
          colorScheme='green'
          onClick={onOpen}
          icon={<AddIcon />}
        />
        <ModelModal
          isOpen={isOpen}
          onClose={() => {
            onClose();
          }}
          body={<AddType onClose={onClose} />}
          title={'Adicionar modelo'}
        />
      </Flex>
      <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
    </FormControl>
  );
}
