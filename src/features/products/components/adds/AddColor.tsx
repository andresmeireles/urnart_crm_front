import { ApolloError, useMutation } from '@apollo/client';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { addColor } from '../../graphql/mutations';

export default function (props: { onClose: () => void }) {
  const { onClose } = props;
  const [color, setColor] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [add] = useMutation(addColor());

  const submit = async () => {
    setIsSubmitting(true);
    if (color.trim().length === 0) {
      setError('Cor precisa ser preenchido');
      setIsSubmitting(false);
      return;
    }
    try {
      await add({
        variables: {
          name: color,
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
        <FormLabel>Nome da cor</FormLabel>
        <Input placeholder='Nome da cor' value={color} onChange={(v) => setColor(v.target.value)} />
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
