import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {
    Avatar,
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent, DrawerHeader,
    DrawerOverlay,
    Flex,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useColorMode,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import {BellIcon, ChevronDownIcon, HamburgerIcon} from "@chakra-ui/icons";
import NotificationList from "../NotificationList";
import Login from "../Login";

const PADDING = 1
const MARGIN = 1
const ICON_SIZE = 6
const MENU_MAX_WIDTH = 60

const Logo = () => (
    <Button as={Link} to="/" fontSize={24} fontWeight={200} m={MARGIN}>
        Investo
        <Image src="https://image.flaticon.com/icons/png/512/4072/4072641.png" boxSize={8}/>
        Bull
    </Button>
)

const HamburgerMenu = ({bgColor}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // visible when screen width narrow
    return <Flex display={['flex', 'flex', 'none', 'none']}>
        <Button onClick={onOpen} bg="transparent" px={PADDING} m={MARGIN}>
            <HamburgerIcon w={ICON_SIZE} h={ICON_SIZE}/>
        </Button>
        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay/>
            <DrawerContent bg={bgColor}>
                <DrawerHeader borderBottomWidth="1px">
                    <Button onClick={onClose} bg="transparent" px={PADDING} mr={3}>
                        <HamburgerIcon w={ICON_SIZE} h={ICON_SIZE}/>
                    </Button>
                    MENU
                </DrawerHeader>
                <DrawerBody>
                    <Button bg="transparent" m={MARGIN} w="100%" as={Link} to="/">Home</Button>
                    <Divider my={1}/>
                    <Button bg="transparent" m={MARGIN} w="100%" as={Link} to="/watchlist">Watchlist</Button>
                    <Divider my={1}/>
                    <Button bg="transparent" m={MARGIN} w="100%" as={Link} to="/news">News</Button>
                    <Divider my={1}/>
                    <Button bg="transparent" m={MARGIN} w="100%" as={Link} to="/about">About</Button>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </Flex>
}

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
                {!loggedIn && <Login setLoggedIn={setLoggedIn}/>}
                {loggedIn && <>
                    <NotificationMenu bgColor={bgColor}/>
                    <UserMenu bgColor={bgColor} toggleColorMode={toggleColorMode} setLoggedIn={setLoggedIn}/>
                </>}
            </Flex>

        </Flex>
    </Flex>
}

export default Navbar;
