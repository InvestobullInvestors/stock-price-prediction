import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    HStack,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon, Icon } from '@chakra-ui/icons';
import { FaMoon, FaSun } from 'react-icons/fa';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import NotificationList from './NotificationList';
import LoginSignupPopup from '../LoginSignup/LoginSignupPopup';
import { useUser } from '../../contexts/useUser';
import { useAuth } from '../../contexts/useAuth';
import UserProfilePopup from './UserProfilePopup';
import { useStockSymbol } from '../../contexts/useStockInfo';

const PADDING = 1;
const MARGIN = 1;
const ICON_SIZE = 6;
const MENU_MAX_WIDTH = 100;
const MENU_MAX_HEIGHT = 400;

const Logo = () => (
    <HStack as={Link} to="/" m={MARGIN}>
        <Text
            display={{ base: 'none', sm: 'flex' }}
            fontSize={24}
            fontWeight={300}
        >
            InvestoBull
        </Text>
        <Image src="/bull-red-512.png" boxSize={8} />
    </HStack>
);

const CustomButton = ({ children, route, ...otherProps }) => (
    <Box
        as={Link}
        to={route}
        fontSize="lg"
        mx={4}
        _hover={{ color: useColorModeValue('brand.500', 'brand.400') }}
        {...otherProps}
    >
        {children}
    </Box>
);

const HamburgerMenu = ({ bgColor }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex display={['flex', 'flex', 'none', 'none']}>
            <Button onClick={onOpen} bg="transparent" px={PADDING} m={MARGIN}>
                <HamburgerIcon w={ICON_SIZE} h={ICON_SIZE} />
            </Button>
            <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg={bgColor}>
                    <DrawerHeader borderBottomWidth="1px">
                        <Button
                            onClick={onClose}
                            bg="transparent"
                            px={PADDING}
                            mr={3}
                        >
                            <HamburgerIcon w={ICON_SIZE} h={ICON_SIZE} />
                        </Button>
                        MENU
                    </DrawerHeader>
                    <DrawerBody>
                        <CustomButton route="/">Home</CustomButton>
                        <Divider my={2} />
                        <CustomButton route="/watchlist">
                            Watchlist
                        </CustomButton>
                        <Divider my={2} />
                        <CustomButton route="/news">News</CustomButton>
                        <Divider my={2} />
                        <CustomButton route="/plans">Plans</CustomButton>
                        <Divider my={2} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    );
};

const NavbarLinks = () => (
    <Flex display={['none', 'none', 'flex', 'flex']}>
        <CustomButton route="/">Home</CustomButton>
        <CustomButton route="/watchlist">Watchlist</CustomButton>
        <CustomButton route="/news">News</CustomButton>
        <CustomButton route="/plans">Plans</CustomButton>
    </Flex>
);

const ThemeSwitchButton = ({ icon }) => {
    const { toggleColorMode } = useColorMode();

    return (
        <Button
            variant="ghost"
            rounded="full"
            p={PADDING}
            m={MARGIN}
            onClick={toggleColorMode}
        >
            <Icon as={icon} w={5} h={5} />
        </Button>
    );
};

const NotificationMenu = ({ bgColor }) => {
    const [newNotification, setNewNotification] = useState(false);
    const redColor = useColorModeValue('red.light', 'red.dark');
    const { notifications } = useUser();

    useEffect(() => {
        setNewNotification(notifications.length > 0);
    }, [notifications]);

    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                as={Button}
                variant="ghost"
                rounded="full"
                p={PADDING}
                m={MARGIN}
                rightIcon={<ChevronDownIcon />}
            >
                <Icon
                    as={newNotification ? VscBellDot : VscBell}
                    color={newNotification ? redColor : 'brand'}
                    w={ICON_SIZE}
                    h={ICON_SIZE}
                />
            </MenuButton>
            <MenuList
                bg={bgColor}
                maxW={MENU_MAX_WIDTH}
                maxH={MENU_MAX_HEIGHT}
                overflow="auto"
                css={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        width: '0px',
                    },
                }}
            >
                <NotificationList />
            </MenuList>
        </Menu>
    );
};

const UserMenu = ({ bgColor }) => {
    const { user } = useUser();
    const { logout } = useAuth();
    const { getBasicStockInfo } = useStockSymbol();

    const handleLogout = async () => {
        try {
            await logout();
            getBasicStockInfo();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Menu>
            <MenuButton
                as={Button}
                variant="ghost"
                rounded="full"
                p={PADDING}
                m={MARGIN}
                rightIcon={<ChevronDownIcon />}
            >
                <Avatar size="sm" name={user.displayName} src={user.photoURL} />
            </MenuButton>
            <MenuList bg={bgColor} maxW={MENU_MAX_WIDTH} isTruncated>
                <MenuGroup title={user.displayName}>
                    <UserProfilePopup />
                    <MenuItem as={Link} to="/plans">
                        <VStack alignItems="flex-start" spacing={0}>
                            <Text>Plan: {user.plan}</Text>
                            {user.plan_expiry ? (
                                <Text fontSize="xs">
                                    expires {user.plan_expiry}
                                </Text>
                            ) : null}
                        </VStack>
                    </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuItem as={Link} to="/about">
                    About Us
                </MenuItem>
                <MenuItem as="button" onClick={handleLogout}>
                    Log Out
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

const Navbar = () => {
    const { user } = useUser();

    const bgColor = useColorModeValue('brand.100', 'brand.800');
    const txtColor = useColorModeValue('brand.900', 'brand.100');

    return (
        <>
            <Flex
                zIndex={5}
                pos="sticky"
                top={0}
                w="100%"
                justify="center"
                bg={bgColor}
                color={txtColor}
            >
                <Flex flex={1} h={16} p={4} align="center" maxW="container.xl">
                    <HamburgerMenu bgColor={bgColor} />
                    <Logo />
                    <NavbarLinks />

                    <Flex flex="1" align="center" justify="flex-end">
                        {useColorMode().colorMode === 'light' ? (
                            <ThemeSwitchButton icon={FaMoon} />
                        ) : (
                            <ThemeSwitchButton icon={FaSun} />
                        )}
                        {user ? (
                            <>
                                <NotificationMenu bgColor={bgColor} />
                                <UserMenu bgColor={bgColor} />
                            </>
                        ) : (
                            <LoginSignupPopup />
                        )}
                    </Flex>
                </Flex>
            </Flex>
            <Divider pos="fixed" />
        </>
    );
};

export default Navbar;
