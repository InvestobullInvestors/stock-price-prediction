import React, { useEffect } from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import CustomHeading from '../components/CustomHeading';
import {
    Center,
    Link,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { useUser } from '../contexts/useUser';
import CustomBox from '../components/CustomBox';
import StockInfoTable from '../components/StockTable/StockInfoTable';
import { useStockSymbol } from '../contexts/useStockInfo';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLoginSignupPopup } from '../contexts/useLoginSignupPopup';
import { Link as ReactRouterLink } from 'react-router-dom';

const Watchlist = () => {
    const { user, watchlist } = useUser();
    const {
        getWatchlistStockInfo,
        watchlistStockInfo,
        sortStocks,
        setWatchlistStockInfo,
        isWatchlistDataLoading,
    } = useStockSymbol();
    const { setMode, onOpen } = useLoginSignupPopup();
    const blueColor = useColorModeValue('blue.light', 'blue.dark');

    useEffect(() => {
        const tickers = [];
        watchlist.forEach(({ ticker }) => tickers.push(ticker));
        getWatchlistStockInfo(tickers);
    }, [watchlist]);

    const handleSortClick = (key, direction) => {
        sortStocks(watchlistStockInfo, key, direction, setWatchlistStockInfo);
    };

    const EmptyWatchlistPrompt = () => (
        <CustomBox w="100%">
            <VStack m={8}>
                <Text>Your watchlist is empty!</Text>
                <Text>
                    Add stocks form the
                    <Link as={ReactRouterLink} to="/" color={blueColor} mx={1}>
                        Home
                    </Link>
                    page.
                </Text>
            </VStack>
        </CustomBox>
    );

    const SignInPrompt = () => (
        <CustomBox w="100%">
            <Center m={8}>
                <Link
                    as="button"
                    onClick={() => {
                        setMode('login');
                        onOpen();
                    }}
                    color={blueColor}
                    mx={1}
                >
                    Log In
                </Link>
                or
                <Link
                    as="button"
                    onClick={() => {
                        setMode('signup');
                        onOpen();
                    }}
                    color={blueColor}
                    mx={1}
                >
                    Sign Up
                </Link>
                to use the watchlist!
            </Center>
        </CustomBox>
    );

    return (
        <PageTemplate>
            <VStack spacing={8}>
                <CustomHeading>Watchlist</CustomHeading>
                {isWatchlistDataLoading ? (
                    <LoadingSpinner />
                ) : user ? (
                    watchlist.length > 0 ? (
                        <StockInfoTable
                            stocks={watchlistStockInfo}
                            handleSortClick={handleSortClick}
                        />
                    ) : (
                        <EmptyWatchlistPrompt />
                    )
                ) : (
                    <SignInPrompt />
                )}
            </VStack>
        </PageTemplate>
    );
};

export default Watchlist;
