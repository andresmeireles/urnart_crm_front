import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { LoginType } from '../pages/Login';

export default function (props: {
  errors: FieldErrors<LoginType>;
  register: UseFormRegister<LoginType>;
}) {
  const { errors, register } = props;
  const [show, setShow] = useState(false);

  return (
    <FormControl id='password' isInvalid={errors.password !== undefined}>
      <FormLabel>Senha</FormLabel>
      <InputGroup size='md'>
        <Input type={show ? 'text' : 'password'} {...register('password')} />
        <InputRightElement width='3rem'>
          <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
            {show ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
    </FormControl>
  );
}
