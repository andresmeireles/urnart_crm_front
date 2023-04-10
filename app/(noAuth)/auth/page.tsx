"use client";

import {
  Grid,
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Checkbox,
  Button,
  Box,
  Link,
} from "@chakra-ui/react";

export default function Auth() {
  return (
    <Grid minH="calc(100vh)" bg={"gray.100"}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <form>
          <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={8}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Urnart CRM</Heading>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl
                  id="username"
                  //   isInvalid={errors.username !== undefined}
                >
                  <FormLabel>Usuário</FormLabel>
                  <Input
                    type="text"
                    autoComplete="off"
                    // {...register("username")}
                  />
                  <FormErrorMessage>
                    {/* {errors.username && errors.username.message} */}
                  </FormErrorMessage>
                </FormControl>
                {/* <PasswordInput errors={errors} register={register} /> */}
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Lembre-se de mim</Checkbox>
                    <Link fontSize={"xs"} color={"blue.400"}>
                      Esqueci minha senha
                    </Link>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"green.400"}
                    color={"white"}
                    _hover={{
                      bg: "green.500",
                    }}
                    // isDisabled={isSubmitting}
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
