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
import { colorQuery, specQuery } from '../../graphql/query';
import { ProductOptsInterface } from '../../model/Interfaces';
import { AddProductType } from '../../pages/AddProduct';
import AddSpec from '../adds/AddSpec';
import ModelModal from '../modals/ModelModal';

export default function (props: {
  register: UseFormRegister<AddProductType>;
  errors: FieldErrors<AddProductType>;
  setValue: UseFormSetValue<AddProductType>;
}) {
  const { errors, setValue, register } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [specs, setSpecs] = useState<ProductOptsInterface[]>([]);

  const getSpecs = async () => {
    const { error, data } = await client.query({
      query: specQuery(),
      fetchPolicy: 'network-only',
    });
    if (error !== undefined) {
      setSpecs([]);
      return;
    }
    if (data !== undefined) {
      const specs = data!.specs.map((spec) => ({
        id: spec.id,
        name: spec.name,
      }));
      setSpecs(specs);
      return;
    }
    setSpecs([]);
    return;
  };

  useEffect(() => {
    getSpecs().catch(console.error);
  }, []);

  const closeAction = async () => {
    await getSpecs();
    onClose();
  };

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
        >
          {specs.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.name}
            </option>
          ))}
        </Select>
        <IconButton
          aria-label={'add spec'}
          colorScheme='green'
          onClick={onOpen}
          icon={<AddIcon />}
        />
      </Flex>
      <ModelModal
        isOpen={isOpen}
        onClose={closeAction}
        body={<AddSpec onClose={closeAction} />}
        title={'Adicionar modelo'}
      />
      <FormErrorMessage>{errors.spec && errors.spec.message}</FormErrorMessage>
    </FormControl>
  );
}
