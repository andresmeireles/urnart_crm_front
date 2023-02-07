import { Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spacer, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Nav(props: { drawer?: ReactNode }) {
    const { drawer } = props;

    const drawerWidget = drawer ?? <p></p>;

    return <Box
        bg={useColorModeValue('gray.100', 'gray.900')} px={4}
    >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            {drawerWidget}
            Navbar
            <Spacer />
            <Flex alignItems={'center'}>
                <Menu>
                    <MenuButton
                        as={Button}
                        rounded={'full'}
                        cursor={'pointer'}
                        minW={0}>
                        User name
                    </MenuButton>
                    <MenuList>
                        {/* <MenuItem>Link 1</MenuItem>
                        <MenuItem>Link 2</MenuItem>
                        <MenuDivider /> */}
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    </Box>
}