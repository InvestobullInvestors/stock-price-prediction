import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {
    Avatar,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useColorMode,
    useColorModeValue
} from "@chakra-ui/react";
import {BellIcon, ChevronDownIcon, HamburgerIcon} from "@chakra-ui/icons";
import NotificationList from "../NotificationList";

const PADDING = 1
const MARGIN = 1
const ICON_SIZE = 6
const MENU_MAX_WIDTH = 60

const Logo = () => (
    // TODO: update logo
    <Button as={Link} to="/" fontSize={24} fontWeight={200} m={MARGIN}>InvestoBull</Button>
)

const HamburgerMenu = ({bgColor}) => (
    // visible when screen width narrow
    <Flex display={['flex', 'flex', 'none', 'none']}>
        <Menu>
            <MenuButton as={Button} bg="transparent" px={PADDING} m={MARGIN}>
                <HamburgerIcon w={ICON_SIZE} h={ICON_SIZE}/>
            </MenuButton>
            <MenuList bg={bgColor}  maxW={MENU_MAX_WIDTH}>
                <MenuItem as={Link} to="/">Home</MenuItem>
                <MenuItem as={Link} to="/watchlist">Watchlist</MenuItem>
                <MenuItem as={Link} to="/news">News</MenuItem>
                <MenuItem as={Link} to="/about">About</MenuItem>
            </MenuList>
        </Menu>
    </Flex>
)

const Links = () => (
    // visible when screen width wide
    <Flex display={['none', 'none', 'flex', 'flex']}>
        <Button bg="transparent" m={MARGIN} as={Link} to="/">Home</Button>
        <Button bg="transparent" m={MARGIN} as={Link} to="/watchlist">Watchlist</Button>
        <Button bg="transparent" m={MARGIN} as={Link} to="/news">News</Button>
        <Button bg="transparent" m={MARGIN} as={Link} to="/about">About</Button>
    </Flex>
)

const sampleNotifications = [
    {
        text: "Hi! I am the 1st notification! I can take up multiple lines if needed!",
        viewed: false
    },
    {
        text: "Me is 2nd notification!",
        viewed: true
    },
    {
        text: "3rd notification here!",
        viewed: false
    }
]

const NotificationMenu = ({bgColor}) => (
    <Menu>
        <MenuButton as={Button} bg="transparent" rounded="full" px={PADDING} m={MARGIN}
                    rightIcon={<ChevronDownIcon/>}>
            <BellIcon w={ICON_SIZE} h={ICON_SIZE}/>
        </MenuButton>
        <MenuList bg={bgColor} maxW={MENU_MAX_WIDTH}>
            <NotificationList notificationList={sampleNotifications}/>
        </MenuList>
    </Menu>
)

const userName = "pro_sk8ter_boi"

const UserMenu = ({bgColor, toggleColorMode, setLoggedIn}) => (
    <Menu>
        <MenuButton as={Button} bg="transparent" rounded="full" px={PADDING} m={MARGIN}
                    rightIcon={<ChevronDownIcon/>}>
            <Avatar size="sm"/>
        </MenuButton>
        <MenuList bg={bgColor} maxW={MENU_MAX_WIDTH}>
            <MenuItem fontWeight="bold" isTruncated>{userName}</MenuItem>
            <MenuDivider/>
            <MenuItem as={Link} to="/plans">Upgrade Account</MenuItem>
            <MenuItem>Help</MenuItem>
            <MenuItem as="button" onClick={toggleColorMode}>
                Use {useColorMode().colorMode === "light" ? "Dark" : "Light"} Theme
            </MenuItem>
            <MenuItem as="button" onClick={() => setLoggedIn(false)}>Log Out</MenuItem>
        </MenuList>
    </Menu>
)

const Navbar = () => {
    const {toggleColorMode} = useColorMode()
    const bgColor = useColorModeValue("brand.400", "brand.900")
    const txtColor = useColorModeValue("brand.900", "brand.100")
    const [loggedIn, setLoggedIn] = useState(false)

    return <Flex zIndex={5} pos="sticky" top={0} w="100%" justify="center" bg={bgColor} color={txtColor}>
        <Flex flex={1} h={16} p={4} align="center" maxW="container.xl">

            <HamburgerMenu bgColor={bgColor}/>
            <Logo/>
            <Links/>

            <Flex flex="1" align="center" justify="flex-end">
                {!loggedIn && <Button onClick={() => setLoggedIn(true)}>Log In</Button>}
                {loggedIn && <>
                    <NotificationMenu bgColor={bgColor}/>
                    <UserMenu bgColor={bgColor} toggleColorMode={toggleColorMode} setLoggedIn={setLoggedIn}/>
                </>}
            </Flex>

        </Flex>
    </Flex>
}

export default Navbar;
