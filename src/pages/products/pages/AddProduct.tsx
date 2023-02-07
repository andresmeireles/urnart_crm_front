import { AddIcon } from '@chakra-ui/icons';
import {
  Container,
  Text,
  Grid,
  GridItem,
  Input,
  Select,
  Flex,
  Button,
  IconButton,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Header from '../../../core/components/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    model: yup.number().required(),
    type: yup.number().required(),
    height: yup.string().required(),
    price: yup.number().required(),
    color: yup
      .string()
      .nullable()
      .optional()
      .transform((_, val) => (val !== '' ? Number(val) : null)),
    spec: yup
      .string()
      .nullable()
      .optional()
      .transform((_, val) => (val !== '' ? Number(val) : null)),
  })
  .required();
type AddProductType = yup.InferType<typeof schema>;

export default function AddProduct() {
  const navigation = useNavigate();
  const toast = useToast();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddProductType>({ resolver: yupResolver(schema) });
  // const onSubmit = handleSubmit((data) => console.log(data));
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
            <FormControl isInvalid={errors.model !== undefined}>
              <Text>
                Modelo<span style={{ color: 'red' }}>*</span>
              </Text>
              <Flex gap={2}>
                <Select
                  placeholder='modelo'
                  {...register('model')}
                  onChange={(v: ChangeEvent<HTMLSelectElement>) =>
                    setValue('model', Number(v.currentTarget.value))
                  }
                >
                  <option value='1'>Option 1</option>
                  <option value='2'>Option 2</option>
                  <option value='3'>Option 3</option>
                </Select>
                <IconButton aria-label={'add model'} icon={<AddIcon />} />
              </Flex>
              <FormErrorMessage>{errors.model && errors.model.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={errors.type !== undefined}>
              <Text>
                Tipo<span style={{ color: 'red' }}>*</span>
              </Text>
              <Flex gap={2}>
                <Select
                  placeholder='tipo'
                  {...register('type')}
                  onChange={(v: ChangeEvent<HTMLSelectElement>) =>
                    setValue('model', Number(v.currentTarget.value))
                  }
                >
                  <option value='1'>Option 1</option>
                  <option value='2'>Option 2</option>
                  <option value='3'>Option 3</option>
                </Select>
                <IconButton aria-label={'add type'} icon={<AddIcon />} />
              </Flex>
              <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
            </FormControl>
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
            <FormControl isInvalid={errors.color !== undefined}>
              <Text>Cor</Text>
              <Flex gap={2}>
                <Select placeholder='modelo' {...register('color')}></Select>
                <IconButton aria-label={'add color'} icon={<AddIcon />} />
              </Flex>
              <FormErrorMessage>{errors.color && errors.color.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={errors.spec !== undefined}>
              <Text>Especificidade</Text>
              <Flex gap={2}>
                <Select placeholder='especificação' {...register('spec')}></Select>
                <IconButton aria-label={'add spec'} icon={<AddIcon />} />
              </Flex>
              <FormErrorMessage>{errors.spec && errors.spec.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
      </Container>
    </form>
  );
}
