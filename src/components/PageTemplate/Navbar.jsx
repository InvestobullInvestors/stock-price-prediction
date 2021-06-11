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

const PADDING = 1
const MARGIN = 1
const ICON_SIZE = 6

const Logo = () => {
    // TODO: update logo
    return <Link to="/"><Button fontSize={24} fontWeight={200} m={MARGIN}>InvestoBull</Button></Link>;
}

const HamburgerMenu = ({bgColor}) => {
    // visible when screen width narrow
    return <Flex display={['flex', 'flex', 'none', 'none']}>
        <Menu>
            <MenuButton as={Button} bg="transparent" pl={PADDING} pr={PADDING} m={MARGIN}>
                <HamburgerIcon w={ICON_SIZE} h={ICON_SIZE}/>
            </MenuButton>
            <MenuList bg={bgColor}>
                <Link to="/"><MenuItem>Home</MenuItem></Link>
                <Link to="/watchlist"><MenuItem>Watchlist</MenuItem></Link>
                <Link to="/news"><MenuItem>News</MenuItem></Link>
                <Link to="/about"><MenuItem>About</MenuItem></Link>
            </MenuList>
        </Menu>
    </Flex>
}

const Links = () => {
    // visible when screen width wide
    return <Flex display={['none', 'none', 'flex', 'flex']}>
        <Link to="/"><Button bg="transparent" m={MARGIN}>Home</Button></Link>
        <Link to="/watchlist"><Button bg="transparent" m={MARGIN}>Watchlist</Button></Link>
        <Link to="/news"><Button bg="transparent" m={MARGIN}>News</Button></Link>
        <Link to="/about"><Button bg="transparent" m={MARGIN}>About</Button></Link>
    </Flex>
}

const ThemeSwitch = ({tcm}) => {
    return <Flex display={['none', 'flex', 'flex', 'flex']} p={PADDING} m={MARGIN}><Switch onChange={tcm}/></Flex>
}

const Notifications = ({bgColor}) => {
    return <Menu>
        <MenuButton as={Button} bg="transparent" borderRadius="full" pl={PADDING} pr={PADDING} m={MARGIN}
                    rightIcon={<ChevronDownIcon/>}>
            <BellIcon w={ICON_SIZE} h={ICON_SIZE}/>
        </MenuButton>
        <MenuList bg={bgColor}>
            <MenuItem>Placeholder Notification 1</MenuItem>
            <MenuItem>Placeholder Notification 2</MenuItem>
            <MenuItem>Placeholder Notification 3</MenuItem>
        </MenuList>
    </Menu>
}

const UserMenu = ({bgColor}) => {
    return <Menu>
        <MenuButton as={Button} bg="transparent" borderRadius="full" pl={PADDING} pr={PADDING} m={MARGIN}
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
}

const Navbar = () => {
    const {toggleColorMode} = useColorMode()
    const bgColor = useColorModeValue("brand.400", "brand.900")
    const txtColor = useColorModeValue("brand.900", "brand.100")

    return <Flex zIndex={5} pos="sticky" top={0} w="100%" justify="center" bg={bgColor} color={txtColor}>
        <Flex flex={1} h={16} p={4} align="center" maxW="container.xl">

            <HamburgerMenu bgColor={bgColor}/>
            <Logo/>
            <Links/>

            <Flex flex="1" align="center" justify="flex-end">
                <ThemeSwitch tcm={toggleColorMode}/>
                <Notifications bgColor={bgColor}/>
                <UserMenu bgColor={bgColor}/>
            </Flex>

        </Flex>
    </Flex>
};

export default Navbar;
