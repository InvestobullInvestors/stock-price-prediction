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
import LoginPopup from "../LoginPopup";
import {useUser} from "../../contexts/useUser";
import {useAuth} from "../../contexts/useAuth";

const PADDING = 1
const MARGIN = 1
const ICON_SIZE = 6
const MENU_MAX_WIDTH = 60

const Logo = () => (
    <Button as={Link} to="/" fontSize={24} fontWeight={200} m={MARGIN}>
        InvestoBull
        <Image src="https://image.flaticon.com/icons/png/512/4072/4072641.png" boxSize={8}/>
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
        text: "AMC jumped by 50%",
        viewed: false
    },
    {
        text: "TSLA fell by 25%",
        viewed: true
    },
    {
        text: "Welcome to Investobull!",
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

const UserMenu = ({bgColor, setLogoutError}) => {
    const {user} = useUser()
    const {logout} = useAuth()
    const {toggleColorMode} = useColorMode()

    const handleLogout = async () => {
        try {
            setLogoutError("")
            await logout()
        } catch {
            return setLogoutError("Failed to log out")
        }
    }

    return (
    <Menu>
        <MenuButton as={Button} bg="transparent" rounded="full" px={PADDING} m={MARGIN}
                    rightIcon={<ChevronDownIcon/>}>
            <Avatar size="sm"/>
        </MenuButton>
        <MenuList bg={bgColor} maxW={MENU_MAX_WIDTH}>
            <MenuItem fontWeight="bold" isTruncated>{user.first_name + " " + user.last_name}</MenuItem>
            <MenuDivider/>
            <MenuItem as={Link} to="/plans">Plans & Pricing</MenuItem>
            <MenuItem>Help</MenuItem>
            <MenuItem as="button" onClick={toggleColorMode}>
                Use {useColorMode().colorMode === "light" ? "Dark" : "Light"} Theme
            </MenuItem>
            <MenuItem as="button" onClick={handleLogout}>Log Out</MenuItem>
        </MenuList>
    </Menu>
    )
}

const Navbar = () => {
    const {user} = useUser()

    const bgColor = useColorModeValue("brand.400", "brand.900")
    const txtColor = useColorModeValue("brand.900", "brand.100")

    const [logoutError, setLogoutError] = useState("")
    // TODO: do something with logoutError

    return <Flex zIndex={5} pos="sticky" top={0} w="100%" justify="center" bg={bgColor} color={txtColor}>
        <Flex flex={1} h={16} p={4} align="center" maxW="container.xl">

            <HamburgerMenu bgColor={bgColor}/>
            <Logo/>
            <Links/>

            <Flex flex="1" align="center" justify="flex-end">
                {user ?
                    <>
                        <NotificationMenu bgColor={bgColor}/>
                        <UserMenu bgColor={bgColor} setLogoutError={setLogoutError}/>
                    </>
                    :
                    <LoginPopup/>
                }
            </Flex>

        </Flex>
    </Flex>
}

export default Navbar;
