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
import {BellIcon, ChevronDownIcon, HamburgerIcon, Icon} from "@chakra-ui/icons";
import {FaSun, FaMoon } from 'react-icons/fa';
import NotificationList from "../../NotificationList";
import LoginSignupPopup from "../../LoginSignup/LoginSignupPopup";
import {useUser} from "../../../contexts/useUser";
import {useAuth} from "../../../contexts/useAuth";

const PADDING = 1
const MARGIN = 1
const ICON_SIZE = 6
const MENU_MAX_WIDTH = 60

const Logo = () => (
    <Button as={Link} to="/" fontSize={24} fontWeight={200} bg="transparent" _hover={{}} m={MARGIN}>
        InvestoBull
        <Image src="https://image.flaticon.com/icons/png/512/4072/4072641.png" boxSize={8}/>
    </Button>
)

const CustomButton = ({children, route, ...otherProps}) => (
    <Button bg="transparent" m={MARGIN} as={Link} {...otherProps} to={route}>{children}</Button>
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
                    <CustomButton w="100%" route="/">Home</CustomButton>
                    <Divider my={1}/>
                    <CustomButton w="100%" route="/watchlist">Watchlist</CustomButton>
                    <Divider my={1}/>
                    <CustomButton w="100%" route="/news">News</CustomButton>
                    <Divider my={1}/>
                    <CustomButton w="100%" route="/about">About</CustomButton>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </Flex>
}

const Links = () => (
    // visible when screen width wide
    <Flex display={['none', 'none', 'flex', 'flex']}>
        <CustomButton route="/">Home</CustomButton>
        <CustomButton route="/watchlist">Watchlist</CustomButton>
        <CustomButton route="/news">News</CustomButton>
        <CustomButton route="/plans">Plans</CustomButton>
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

    const handleLogout = async () => {
        try {
            setLogoutError("")
            await logout()
        } catch (err) {
            return setLogoutError(err.message)
        }
    }

    return (
    <Menu>
        <MenuButton as={Button} bg="transparent" rounded="full" px={PADDING} m={MARGIN}
                    rightIcon={<ChevronDownIcon/>}>
            <Avatar size="sm"/>
        </MenuButton>
        <MenuList bg={bgColor} maxW={MENU_MAX_WIDTH}>
            <MenuItem fontWeight="bold" isTruncated>{user.displayName}</MenuItem>
            <MenuItem>Plan: {user.plan}</MenuItem>
            <MenuDivider/>
            <MenuItem>Help</MenuItem>
            <MenuItem as="button" onClick={handleLogout}>Log Out</MenuItem>
        </MenuList>
    </Menu>
    )
}

const Navbar = () => {
    const {user} = useUser()
    const {toggleColorMode} = useColorMode()

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
                {useColorMode().colorMode === "light" ?
                    <Button bg="transparent" rounded="full" p={0} m={2} onClick={toggleColorMode}>
                        <Icon as={FaMoon} w={6} h={6}/>
                    </Button>
                    :
                    <Button bg="transparent" rounded="full" p={0} m={2} onClick={toggleColorMode}>
                        <Icon as={FaSun} w={6} h={6}/>
                    </Button>}
                {user ? <>
                        <NotificationMenu bgColor={bgColor}/>
                        <UserMenu bgColor={bgColor} setLogoutError={setLogoutError}/>
                    </>
                    :
                    <LoginSignupPopup/>}
            </Flex>

        </Flex>
    </Flex>
}

export default Navbar;
