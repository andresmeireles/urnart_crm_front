import { ApolloError } from '@apollo/client';
import {
  FormControl,
  Grid,
  Input,
  Button,
  useColorModeValue,
  Stack,
  Box,
  FormLabel,
  Link,
  Heading,
  Flex,
  Checkbox,
  FormErrorMessage,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AppAction } from '../../../core/context/AppActions';
import { useAppContext } from '../../../core/context/AppContext';
import { client } from '../../../core/graphql/client';
import PasswordInput from '../components/PasswordInput';
import { auth } from '../graphql/query/query';

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    remember: yup.boolean().required().default(false),
  })
  .required();
export type LoginType = yup.InferType<typeof schema>;

export default function Login() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({ resolver: yupResolver(schema) });
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (formData) => {
    const { username, password, remember } = formData;
    try {
      const { data } = await client.query({
        query: auth(),
        variables: { name: username, password, remember },
      });
      if (data === undefined) {
        setError('username', { type: 'custom', message: 'erro ao  executar login' });
        setError('password', { type: 'custom', message: 'erro ao executar login' });
        return;
      }
      dispatch({ act: AppAction.login, data: { name: username, token: data.login } });
      await client.resetStore();
    } catch (e) {
      const { message } = e as ApolloError;
      setError('username', { type: 'custom', message: message });
      setError('password', { type: 'custom', message: message });
    }
  });
  useEffect(() => {
    if (state.isLogged) {
      navigate('/');
      return;
    }
  }, [state.token]);

  if (isSubmitting) {
    return (
      <Grid minH='calc(100vh)' bg={'gray.100'}>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          Aguarde...
        </Flex>
      </Grid>
    );
  }

  return (
    <Grid minH='calc(100vh)' bg={'gray.100'}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <form onSubmit={onSubmit}>
          <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={8}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Urnart CRM</Heading>
            </Stack>
            <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
              <Stack spacing={4}>
                <FormControl id='username' isInvalid={errors.username !== undefined}>
                  <FormLabel>Usuário</FormLabel>
                  <Input type='text' autoComplete='off' {...register('username')} />
                  <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                </FormControl>
                <PasswordInput errors={errors} register={register} />
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Checkbox {...register('remember')}>Lembre-se de mim</Checkbox>
                    <Link fontSize={'xs'} color={'blue.400'}>
                      Esqueci minha senha
                    </Link>
                  </Stack>
                  <Button
                    type='submit'
                    bg={'green.400'}
                    color={'white'}
                    _hover={{
                      bg: 'green.500',
                    }}
                    isDisabled={isSubmitting}
                  >
                    Entrar
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Flex>
    </Grid>
  );
}
