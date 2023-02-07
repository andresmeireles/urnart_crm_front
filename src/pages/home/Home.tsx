import { AddIcon, AttachmentIcon, DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Grid, GridItem, HStack, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Nav from "../../core/widgets/Nav";
import Menu from "./components/Menu";

export default function Home() {
    return <>
        <SimpleGrid columns={2} row={2} spacing={10} gap={3}>
            <Menu icon={<AddIcon />} color="green.300" name="Produtos" />
            <Menu icon={<ExternalLinkIcon />} name="Produtos" />
            <Menu icon={<AttachmentIcon />} name="Produtos" />
            <Menu icon={<DownloadIcon />} name="Produtos" />
        </SimpleGrid>
    </>
}