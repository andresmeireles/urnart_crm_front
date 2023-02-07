import {
  Button,
  Text,
  FormControl,
  Grid,
  GridItem,
  Input,
  Container,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../core/components/Header';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object({
    id: yup
      .number()
      .nullable()
      .optional()
      .transform((_, val) => (val !== '' ? Number(val) : null)),
    tradeName: yup.number().required(),
    companyName: yup.string().required(),
  })
  .required();
type AddCustomerType = yup.InferType<typeof schema>;

export default function AddCustomer() {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddCustomerType>({ resolver: yupResolver(schema) });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <>
      <Header name='Criar Cliente' actions={[<Button type='submit'>Adicionar</Button>]} />
      <Container maxW={'container.lg'} mt={10}>
        <form onSubmit={onSubmit}>
          <Grid templateColumns={'repeat(2, 1fr)'} gap={6}>
            <GridItem>
              <FormControl>
                <Text>Numero do cliente</Text>
                <Input placeholder='numero do cliente' {...register('id')} />
                <Text fontSize={'2xs'} color='red.400'>
                  caso não definido um sera atribuído automaticamente
                </Text>
                <FormErrorMessage>{errors.id && errors.id.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <Text>Numero do cliente</Text>
                <Input placeholder='numero do cliente' {...register('tradeName')} />
                <Text fontSize={'2xs'} color='red.400'>
                  caso não definido um sera atribuído automaticamente
                </Text>
                <FormErrorMessage>{errors.id && errors.id.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>Nome Fantasia</GridItem>
          </Grid>
        </form>
      </Container>
    </>
  );
}
