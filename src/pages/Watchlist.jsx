import React, { useEffect } from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import CustomHeading from "../components/CustomHeading";
import { Center } from "@chakra-ui/react";
import { useUser } from "../contexts/useUser";
import CustomBox from "../components/CustomBox";
import StockInfoTable from "../components/StockTable/StockInfoTable";
import { useStockSymbol } from "../contexts/useStockInfo";

const Watchlist = () => {
    const { user, watchlist } = useUser();
    const {
        getWatchlistStockInfo,
        watchlistStockInfo,
        sortStocks,
        setWatchlistStockInfo,
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
            <CustomHeading>Watchlist</CustomHeading>
            {user ? (
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
        </PageTemplate>
    );
};

export default Watchlist;
