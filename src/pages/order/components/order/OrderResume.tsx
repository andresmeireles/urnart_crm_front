import { Container, Text, Flex } from "@chakra-ui/react";
import { AddOrderData } from "../../model/AddOrderData";

export default function OrderResume(props: { order: AddOrderData }) {
  const { order } = props;
  return (<>
    <Container maxW={"container.sm"}>
      <Flex pt={2}>
        <Text flex={2}>Valor dos produtos</Text>
        <Text flex={3}>{Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(order.productsTotalPrice)}</Text>
      </Flex>
      <Flex pt={2}>
        <Text flex={2}>Total de produtos</Text>
        <Text flex={3}>{order.totalAmount}</Text>
      </Flex>
      <Flex pt={2}>
        <Text flex={2}>Valor total do pedido:</Text>
        <Text flex={3}>{Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(order.orderTotalPrice)}</Text>
      </Flex>
    </Container>
  </>);
}
