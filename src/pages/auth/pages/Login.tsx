import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
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
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
type LoginType = yup.InferType<typeof schema>;

export default function Login() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({ resolver: yupResolver(schema) });
  const [show, setShow] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setError('username', { type: 'manual', message: 'username or password wrong' });
    setError('password', { type: 'manual', message: 'username or password wrong' });
  });

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
                  <Input type='text' {...register('username')} />
                  <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                </FormControl>
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
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Checkbox>Lembre-se de mim</Checkbox>
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
