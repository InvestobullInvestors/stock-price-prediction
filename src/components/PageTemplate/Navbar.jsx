import React from 'react';
import {Link} from 'react-router-dom'
import {
    Avatar,
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
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
import {FaMoon, FaSun} from 'react-icons/fa';
import NotificationList from "../NotificationList";
import LoginSignupPopup from "../LoginSignup/LoginSignupPopup";
import {useUser} from "../../contexts/useUser";
import {useAuth} from "../../contexts/useAuth";
import UserProfilePopup from "./UserProfilePopup";

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

const NarrowScreenHamburgerMenu = ({bgColor}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

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

const WideScreenLinks = () => (
    <Flex display={['none', 'none', 'flex', 'flex']}>
        <CustomButton route="/">Home</CustomButton>
        <CustomButton route="/watchlist">Watchlist</CustomButton>
        <CustomButton route="/news">News</CustomButton>
        <CustomButton route="/plans">Plans</CustomButton>
    </Flex>
)

const NotificationMenu = ({bgColor}) => (
    <Menu>
        <MenuButton as={Button} bg="transparent" rounded="full" px={PADDING} m={MARGIN}
                    rightIcon={<ChevronDownIcon/>}>
            <BellIcon w={ICON_SIZE} h={ICON_SIZE}/>
        </MenuButton>
        <MenuList bg={bgColor} maxW={MENU_MAX_WIDTH}>
            <NotificationList/>
        </MenuList>
    </Menu>
)

const UserMenu = ({bgColor}) => {
    const {user} = useUser()
    const {logout} = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (err) {
            console.error(err.message)
        }
    }

    return <Menu>
        <MenuButton as={Button} bg="transparent" rounded="full" px={PADDING} m={MARGIN}
                    rightIcon={<ChevronDownIcon/>}>
            <Avatar size="sm" name={user.displayName} src={user.photoURL}/>
        </MenuButton>
        <MenuList bg={bgColor} maxW={MENU_MAX_WIDTH}>
            <UserProfilePopup/>
            <MenuItem as={Link} to="/plans">Plan: {user.plan}</MenuItem>
            <MenuDivider/>
            <MenuItem as={Link} to="/about">About Us</MenuItem>
            <MenuItem>Help</MenuItem>
            <MenuItem as="button" onClick={handleLogout}>Log Out</MenuItem>
        </MenuList>
    </Menu>
}

const Navbar = () => {
    const {user} = useUser()
    const {toggleColorMode} = useColorMode()

    const bgColor = useColorModeValue("brand.400", "brand.900")
    const txtColor = useColorModeValue("brand.900", "brand.100")

    return <Flex zIndex={5} pos="sticky" top={0} w="100%" justify="center" bg={bgColor} color={txtColor}>
        <Flex flex={1} h={16} p={4} align="center" maxW="container.xl">

            <NarrowScreenHamburgerMenu bgColor={bgColor}/>
            <Logo/>
            <WideScreenLinks/>

            <Flex flex="1" align="center" justify="flex-end">
                {useColorMode().colorMode === "light" ?
                    <Button bg="transparent" rounded="full" p={0} m={2} onClick={toggleColorMode}>
                        <Icon as={FaMoon} w={6} h={6}/>
                    </Button>
                    :
                    <Button bg="transparent" rounded="full" p={0} m={2} onClick={toggleColorMode}>
                        <Icon as={FaSun} w={6} h={6}/>
                    </Button>
                }
                {user ?
                    <>
                        <NotificationMenu bgColor={bgColor}/>
                        <UserMenu bgColor={bgColor}/>
                    </>
                    :
                    <LoginSignupPopup/>
                }
            </Flex>

        </Flex>
    </Flex>
}

export default Navbar;
