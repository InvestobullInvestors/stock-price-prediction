import React, { useEffect } from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import CustomHeading from '../components/CustomHeading';
import { Link, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useUser } from '../contexts/useUser';
import CustomBox from '../components/CustomBox';
import StockInfoTable from '../components/StockTable/StockInfoTable';
import { useStockSymbol } from '../contexts/useStockInfo';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link as ReactRouterLink } from 'react-router-dom';
import SignInPromptBox from '../components/SignInPromptBox';

const Watchlist = () => {
    const { user, watchlist } = useUser();
    const {
        getWatchlistStockInfo,
        watchlistStockInfo,
        sortStocks,
        setWatchlistStockInfo,
        isWatchlistDataLoading,
    } = useStockSymbol();

    useEffect(() => {
        const tickers = [];
        watchlist.forEach(({ ticker }) => tickers.push(ticker));
        getWatchlistStockInfo(tickers);
    }, [watchlist]);

    const handleSortClick = (key, direction) => {
        sortStocks(watchlistStockInfo, key, direction, setWatchlistStockInfo);
    };

    const EmptyWatchlistPromptBox = () => (
        <CustomBox w="100%">
            <VStack m={8} fontSize="lg">
                <Text>Your watchlist is empty!</Text>
                <Text>
                    Add stocks form the
                    <Link
                        as={ReactRouterLink}
                        to="/"
                        color={useColorModeValue('blue.light', 'blue.dark')}
                        mx={1}
                    >
                        Home
                    </Link>
                    page.
                </Text>
            </VStack>
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
                        <EmptyWatchlistPromptBox />
                    )
                ) : (
                    <SignInPromptBox text="to use the Watchlist!" w="100%" />
                )}
            </VStack>
        </PageTemplate>
    );
};

export default Watchlist;
