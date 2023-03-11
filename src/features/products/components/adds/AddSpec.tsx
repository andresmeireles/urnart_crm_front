import { ApolloError, useMutation } from '@apollo/client';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { addSpec } from '../../graphql/mutations';

export default function (props: { onClose: () => void }) {
  const { onClose } = props;
  const [spec, setSpec] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [add] = useMutation(addSpec());

  const submit = async () => {
    setIsSubmitting(true);
    if (spec.trim().length === 0) {
      setError('especificação precisa ser preenchido');
      setIsSubmitting(false);
      return;
    }
    try {
      await add({
        variables: {
          name: spec,
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
          placeholder='Nome da especificação'
          value={spec}
          onChange={(v) => setSpec(v.target.value)}
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
