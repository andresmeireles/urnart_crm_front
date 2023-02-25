import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';

export default function (props: { onClose: () => void }) {
  const { onClose } = props;
  const [model, setModel] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setIsSubmitting(true);
    if (model.trim().length === 0) {
      setError('modelo precisa ser preenchido');
      setIsSubmitting(false);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onClose();
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
