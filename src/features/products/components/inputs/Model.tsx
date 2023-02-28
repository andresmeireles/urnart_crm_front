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
import { ChangeEvent, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { AddProductType } from '../../pages/AddProduct';
import AddModel from '../adds/AddModel';
import ModelModal from '../modals/ModelModal';

export default function (props: {
  register: UseFormRegister<AddProductType>;
  errors: FieldErrors<AddProductType>;
  setValue: UseFormSetValue<AddProductType>;
}) {
  const { register, errors, setValue } = props;
  const [models, setModels] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <FormControl isInvalid={errors.model !== undefined}>
      <Text>
        Modelo<span style={{ color: 'red' }}>*</span>
      </Text>
      <Flex gap={2}>
        <Select
          placeholder='modelo'
          {...register('model')}
          onChange={(v: ChangeEvent<HTMLSelectElement>) =>
            setValue('model', Number(v.currentTarget.value))
          }
        >
          {models.map((model) => (
            <option>{model}</option>
          ))}
        </Select>
        <IconButton
          colorScheme={'green'}
          aria-label={'add model'}
          icon={<AddIcon />}
          onClick={onOpen}
        />
        <ModelModal
          isOpen={isOpen}
          onClose={() => {
            onClose();
          }}
          body={<AddModel onClose={onClose} />}
          title={'Adicionar modelo'}
        />
      </Flex>
      <FormErrorMessage>{errors.model && errors.model.message}</FormErrorMessage>
    </FormControl>
  );
}
