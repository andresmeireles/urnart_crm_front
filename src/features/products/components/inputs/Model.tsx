import { useQuery } from '@apollo/client';
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
import { modelQuery } from '../../graphql/query';
import { AddProductType } from '../../pages/AddProduct';
import AddModel from '../adds/AddModel';
import ModelModal from '../modals/ModelModal';

interface ModelInterface {
  id: number;
  name: string;
}

export default function (props: {
  register: UseFormRegister<AddProductType>;
  errors: FieldErrors<AddProductType>;
  setValue: UseFormSetValue<AddProductType>;
}) {
  const { register, errors, setValue } = props;
  const [models, setModels] = useState<ModelInterface[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getModels = async () => {
    const { error, data } = await client.query({
      query: modelQuery(),
      fetchPolicy: 'network-only',
    });
    if (error !== undefined) {
      setModels([]);
      return;
    }
    if (data !== undefined) {
      const models = data!.models.map((model) => ({
        id: model.id,
        name: model.name,
      }));
      setModels(models);
      return;
    }
    setModels([]);
    return;
  };

  useEffect(() => {
    getModels().catch(console.error);
  }, []);

  const closeAction = async () => {
    await getModels();
    onClose();
  };

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
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
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
          onClose={closeAction}
          body={<AddModel onClose={closeAction} />}
          title={'Adicionar modelo'}
        />
      </Flex>
      <FormErrorMessage>{errors.model && errors.model.message}</FormErrorMessage>
    </FormControl>
  );
}
