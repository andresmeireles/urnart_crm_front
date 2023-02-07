import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, IconButton, Center, Spacer } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function Header(props: {name: string, actions?: ReactNode[]}) {
    const {name, actions = []} = props;
    const navigate = useNavigate();

    return <Flex>
    <Box flex={1}>
        <Center>
        <IconButton aria-label="back" icon={<ArrowBackIcon />} onClick={() => navigate(-1)} />
        </Center>
    </Box>
    <Box flex={3} alignContent="center">
        <Text fontSize={"3xl"}>{name}</Text>
    </Box>
    <Spacer />
    {actions.map((a) => a)}
</Flex>
}