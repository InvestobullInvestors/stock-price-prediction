import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    IconButton,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/useUser';
import { Link as ReactRouterLink } from 'react-router-dom';

const WatchlistButton = ({ ticker }) => {
    const yellowColor = useColorModeValue('yellow.light', 'yellow.dark');
    const [icon, setIcon] = useState(<BsStar />);
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const { addToWatchlist, removeFromWatchlist, watchlist, user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const tickers = [];
        watchlist.forEach(({ ticker }) => tickers.push(ticker));
        if (tickers.includes(ticker)) {
            setIcon(<BsStarFill />);
            setIsWatchlisted(true);
        }
    }, [watchlist]);

    const ExceededLimitMessage = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <Alert
                        status="info"
                        flexDirection="column"
                        alignItems="center"
                        py={10}
                        my={4}
                    >
                        <AlertIcon boxSize="40px" mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize="lg">
                            Watchlist Limit Reached
                        </AlertTitle>
                        <AlertDescription maxWidth="sm">
                            <Link
                                as={ReactRouterLink}
                                to="/plans"
                                color={useColorModeValue(
                                    'blue.light',
                                    'blue.dark'
                                )}
                                mr={1}
                            >
                                Upgrade
                            </Link>
                            to add more stocks to your Watchlist!
                        </AlertDescription>
                    </Alert>
                </ModalBody>
            </ModalContent>
        </Modal>
    );

    const handleClick = () => {
        if (!user) return;

        if (isWatchlisted) {
            setIcon(<BsStar />);
            removeFromWatchlist(ticker);
        } else {
            if (user.plan === 'Basic' && watchlist.length >= 5) {
                onOpen();
                return;
            }
            setIcon(<BsStarFill />);
            addToWatchlist(ticker);
        }
        setIsWatchlisted(!isWatchlisted);
    };

    return (
        <>
            <ExceededLimitMessage />
            <IconButton
                aria-label="watchlist-button"
                icon={icon}
                color={yellowColor}
                variant="ghost"
                isDisabled={!user}
                title={
                    user
                        ? 'Add to watchlist'
                        : 'Log in to add stock to watchlist'
                }
                onClick={handleClick}
            />
        </>
    );
};

export default WatchlistButton;
