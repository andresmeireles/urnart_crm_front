import {
  Container,
  Text,
  Grid,
  GridItem,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Header from '../../../core/components/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import Model from '../components/inputs/Model';
import Type from '../components/inputs/Type';
import Colors from '../components/inputs/Colors';
import Specs from '../components/inputs/Specs';
import { ApolloClient, ApolloError, useMutation } from '@apollo/client';
import { addProduct } from '../graphql/mutations';

const schema = yup
  .object({
    model: yup.number().required(),
    height: yup.string().required(),
    price: yup.number().required(),
    type: yup
      .number()
      .nullable()
      .optional()
      .transform((_, val) => (val !== '' ? Number(val) : null)),
    color: yup
      .number()
      .nullable()
      .optional()
      .transform((_, val) => (val !== '' ? Number(val) : null)),
    spec: yup
      .number()
      .nullable()
      .optional()
      .transform((_, val) => (val !== '' ? Number(val) : null)),
  })
  .required();

export type AddProductType = yup.InferType<typeof schema>;

export default function AddProduct() {
  const [add] = useMutation(addProduct());
  const navigation = useNavigate();
  const toast = useToast();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddProductType>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (submitData) => {
    const { height, price, model, type, color, spec } = submitData;
    try {
      const { data } = await add({
        variables: {
          height,
          price,
          model,
          type,
          color,
          spec,
        },
      });
      if (data === undefined) {
        return;
      }
      const mutation = data!.addProduct;
      const successMessage = `Urna ${mutation.model.name} ${mutation.height} ${
        mutation.type?.name ?? ''
      } ${mutation.color?.name ?? ''} ${mutation.spec?.name ?? ''}`;
      toast({ title: successMessage, position: 'top-right' });
      navigation(-1);
    } catch (e) {
      if (e instanceof ApolloError) {
        toast({ title: e.message, status: 'error', position: 'top-right' });
        return;
      }
      toast({ title: 'erro ao adicionar produto', status: 'error', position: 'top-right' });
      return;
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Header
        name='Adicionar produto'
        actions={[
          <Button isDisabled={isSubmitting} type='submit'>
            Adicionar
          </Button>,
        ]}
      />
      <p>{errors.model?.message}</p>
      <Container maxW={'container.lg'} mt={8}>
        <Grid templateColumns={'repeat(2, 1fr)'} gap={6}>
          <GridItem>
            {/* Model */}
            <Model register={register} setValue={setValue} errors={errors} />
          </GridItem>
          <GridItem>
            {/* Type form */}
            <Type register={register} setValue={setValue} errors={errors} />
          </GridItem>
          <GridItem>
            <FormControl isInvalid={errors.height !== undefined}>
              <Text>
                Tamanho<span style={{ color: 'red' }}>*</span>
              </Text>
              <Input placeholder='tamanho' {...register('height')} />
              <FormErrorMessage>{errors.height && errors.height.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={errors.price !== undefined}>
              <Text>
                Preço<span style={{ color: 'red' }}>*</span>
              </Text>
              {/* TODO: adicionar mascara */}
              <Input
                placeholder='preço'
                {...register('price')}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem>
            {/* Colors */}
            <Colors errors={errors} setValue={setValue} register={register} />
          </GridItem>
          <GridItem>
            {/* Specs */}
            <Specs errors={errors} setValue={setValue} register={register} />
          </GridItem>
        </Grid>
      </Container>
    </form>
  );
}
