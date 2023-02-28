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
import AddModel from '../adds/AddModel';
import AddSpec from '../adds/AddSpec';
import ModelModal from '../modals/ModelModal';

export default function (props: {
  register: UseFormRegister<AddProductType>;
  errors: FieldErrors<AddProductType>;
  setValue: UseFormSetValue<AddProductType>;
}) {
  const { errors, setValue, register } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <FormControl isInvalid={errors.spec !== undefined}>
      <Text>Especificidade</Text>
      <Flex gap={2}>
        <Select
          placeholder='especificação'
          {...register('spec')}
          onChange={(v: ChangeEvent<HTMLSelectElement>) =>
            setValue('spec', Number(v.currentTarget.value))
          }
        ></Select>
        <IconButton
          aria-label={'add spec'}
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
        body={<AddSpec onClose={onClose} />}
        title={'Adicionar modelo'}
      />
      <FormErrorMessage>{errors.spec && errors.spec.message}</FormErrorMessage>
    </FormControl>
  );
}
