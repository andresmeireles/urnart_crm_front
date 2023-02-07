import { Card, CardBody, CardHeader, Center, Flex, Grid, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";

export default function Menu(props: {
    icon: ReactNode,
    color?: string,
    name: string,
    description?: string
}) {
    const { name, description, icon, color = "red.300" } = props;
    return <Card
        bg={color}
    >
        <CardHeader>
            <Flex>
                <Center flex={1}>
                    {icon}
                </Center>
                <Text flex={3} fontSize={"4xl"} fontWeight="bold">{name}</Text>
            </Flex>
        </CardHeader>
        <CardBody>
            <Text>{description ?? ''}</Text>
        </CardBody>
    </Card>
}