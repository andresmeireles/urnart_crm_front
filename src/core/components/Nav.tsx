import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spacer, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { AppAction } from "../context/AppActions";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Nav(props: { drawer?: ReactNode }) {
    const { drawer } = props;
    const { state: { name }, dispatch } = useAppContext();
    const navigate = useNavigate();

    const drawerWidget = drawer ?? <p></p>;

    const logout = () => {
        dispatch({ act: AppAction.Logout });
        navigate("/login");
    }

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
                        {name}
                    </MenuButton>
                    <MenuList>
                        {/* <MenuItem>Link 1</MenuItem>
                        <MenuItem>Link 2</MenuItem>
                        <MenuDivider /> */}
                        <MenuItem onClick={logout}>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    </Box>
}