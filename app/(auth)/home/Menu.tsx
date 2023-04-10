import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Menu(props: {
  icon: ReactNode;
  color?: string;
  name: string;
  description?: string;
  navigateTo?: string;
}) {
  const { name, description, icon, navigateTo, color = "red.300" } = props;

  return (
    <Link>
      <Card bg={color} size="sm">
        <CardHeader>
          <Flex>
            <Center flex={1}>{icon}</Center>
            <Text flex={3} fontSize={"4xl"} fontWeight="bold">
              {name}
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{description ?? ""}</Text>
        </CardBody>
      </Card>
    </Link>
  );
}
