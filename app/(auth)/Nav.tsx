"use client";

import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Nav() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        {/* {drawerWidget} */}
        <Button>
          {/* <Button variant="ghost" onClick={() => navigate("/")}> */}
          Navbar
        </Button>
        <Spacer />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              cursor={"pointer"}
              minW={0}
            >
              Casa
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
  );
}
