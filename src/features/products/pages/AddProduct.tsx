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

const schema = yup
  .object({
    model: yup.number().required(),
    type: yup.number().required(),
    height: yup.string().required(),
    price: yup.number().required(),
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
  const navigation = useNavigate();
  const toast = useToast();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddProductType>({ resolver: yupResolver(schema) });
  const onSubmit = handleSubmit((data) => {
    const savTxt = `Produto ${data.model} ${data.type} ${data.height} preço = R$ ${data.price} adicionado com sucesso!`;
    toast({ title: savTxt, position: 'top-right' });
    navigation(-1);
  });

  // TODO: adicionar modal para adicionar novo tipo
  // TODO: adicionar toast para ação concluída com sucesso
  return (
    <form onSubmit={onSubmit}>
      <Header name='Adicionar produto' actions={[<Button type='submit'>Adicionar</Button>]} />
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
