import React from 'react';
import {Link} from 'react-router-dom'
import {
    Avatar,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Switch,
    useColorMode,
    useColorModeValue
} from "@chakra-ui/react";
import {BellIcon, ChevronDownIcon, HamburgerIcon} from "@chakra-ui/icons";

const Navbar = () => {
    const MARGIN = 1
    const {toggleColorMode} = useColorMode()
    const bgColor = useColorModeValue("brand.400", "brand.900")
    const txtColor = useColorModeValue("brand.900", "brand.100")

    return (
        <Flex zIndex={5} pos="sticky" top={0} w="100%" justify="center" bg={bgColor} color={txtColor}>
            <Flex flex={1} h={16} p={4} align="center" maxW="container.xl">

                {/*Hamburger Menu, visible when screen width narrow*/}
                <Flex display={['flex', 'flex', 'none', 'none']}>
                    <Menu>
                        <MenuButton as={Button} bg="transparent" pl={1} pr={1} m={MARGIN}>
                            <HamburgerIcon w={6} h={6}/>
                        </MenuButton>
                        <MenuList bg={bgColor}>
                            <Link to="/"><MenuItem>Home</MenuItem></Link>
                            <Link to="/watchlist"><MenuItem>Watchlist</MenuItem></Link>
                            <Link to="/news"><MenuItem>News</MenuItem></Link>
                            <Link to="/about"><MenuItem>About</MenuItem></Link>
                        </MenuList>
                    </Menu>
                </Flex>

                {/*TODO InvestoBull Logo*/}
                <Link to="/"><Button fontSize={24} fontWeight={200} m={MARGIN}>InvestoBull</Button></Link>

                {/*Button Links, visible when screen width wide*/}
                <Flex display={['none', 'none', 'flex', 'flex']}>
                    <Link to="/"><Button bg="transparent" m={MARGIN}>Home</Button></Link>
                    <Link to="/watchlist"><Button bg="transparent" m={MARGIN}>Watchlist</Button></Link>
                    <Link to="/news"><Button bg="transparent" m={MARGIN}>News</Button></Link>
                    <Link to="/about"><Button bg="transparent" m={MARGIN}>About</Button></Link>
                </Flex>

                <Flex flex="1" align="center" justify="flex-end">
                    {/*Light/Dark Mode Toggle*/}
                    <Flex display={['none', 'flex', 'flex', 'flex']} p={1} m={MARGIN}>
                        <Switch onChange={toggleColorMode} />
                    </Flex>

                    {/*Notifications*/}
                    <Menu>
                        <MenuButton as={Button} bg="transparent" borderRadius="full" pl={1} pr={1} m={MARGIN}
                                    rightIcon={<ChevronDownIcon/>}>
                            <BellIcon w={6} h={6}/>
                        </MenuButton>
                        <MenuList bg={bgColor}>
                            <MenuItem>Placeholder Notification 1</MenuItem>
                            <MenuItem>Placeholder Notification 2</MenuItem>
                            <MenuItem>Placeholder Notification 3</MenuItem>
                        </MenuList>
                    </Menu>

                    {/*User Settings*/}
                    <Menu>
                        <MenuButton as={Button} bg="transparent" borderRadius="full" pl={1} pr={1} m={MARGIN}
                                    rightIcon={<ChevronDownIcon/>}>
                            <Avatar size="sm"/>
                        </MenuButton>
                        <MenuList bg={bgColor}>
                            <MenuItem>Profile</MenuItem>
                            <Link to="/plans"><MenuItem>Upgrade Account</MenuItem></Link>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Help</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

            </Flex>
        </Flex>
    );
};

export default Navbar;
