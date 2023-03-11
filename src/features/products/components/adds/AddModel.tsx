import { ApolloError, useMutation } from '@apollo/client';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { addModel } from '../../graphql/mutations';

export default function (props: { onClose: () => void }) {
  const { onClose } = props;
  const [model, setModel] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [add] = useMutation(addModel());

  const submit = async () => {
    setIsSubmitting(true);
    if (model.trim().length === 0) {
      setError('modelo precisa ser preenchido');
      setIsSubmitting(false);
      return;
    }
    try {
      await add({
        variables: {
          name: model,
        },
      });
      onClose();
    } catch (e) {
      if (e instanceof ApolloError) {
        setError(e.message);
        setIsSubmitting(false);
        return;
      }
      setError('erro ao inserir');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FormControl isInvalid={error.trim().length !== 0}>
        <FormLabel>Nome do modelo</FormLabel>
        <Input
          placeholder='Nome do modelo'
          value={model}
          onChange={(v) => setModel(v.target.value)}
        />
        <FormErrorMessage>{error.trim().length !== 0 ? error : ''}</FormErrorMessage>
      </FormControl>
      <Flex mt={3} justify='end' align={'end'}>
        <Button colorScheme={'green'} isDisabled={isSubmitting} onClick={submit}>
          Adicionar
        </Button>
      </Flex>
    </>
  );
}
