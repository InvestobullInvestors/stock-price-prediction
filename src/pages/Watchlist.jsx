import React, { useEffect } from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import CustomHeading from '../components/CustomHeading';
import { Center, Stack } from '@chakra-ui/react';
import { useUser } from '../contexts/useUser';
import CustomBox from '../components/CustomBox';
import StockInfoTable from '../components/StockTable/StockInfoTable';
import { useStockSymbol } from '../contexts/useStockInfo';
import LoadingSpinner from '../components/LoadingSpinner';

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

    const handleSortClick = (key) => {
        sortStocks(watchlistStockInfo, key, setWatchlistStockInfo);
    };

    return (
        <PageTemplate>
            <Stack spacing={8}>
                <CustomHeading>Watchlist</CustomHeading>
                {isWatchlistDataLoading ? (
                    <LoadingSpinner />
                ) : user ? (
                    <StockInfoTable
                        stocks={watchlistStockInfo}
                        handleSortClick={handleSortClick}
                    />
                ) : (
                    <CustomBox>
                        {/*TODO: trigger sign in popup from 'Sign in'*/}
                        <Center fontSize="xl" mx={8} my={4}>
                            Sign in to use watchlist
                        </Center>
                    </CustomBox>
                )}
            </Stack>
        </PageTemplate>
    );
};

export default Watchlist;
