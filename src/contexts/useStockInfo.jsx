import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

const StockInfoContext = createContext({});

const StockInfoProvider = ({ children }) => {
    const [basicStockInfo, setBasicStockInfo] = useState([]);
    const [watchlistStockInfo, setWatchlistStockInfo] = useState([]);
    const [stockDetails, setStockDetails] = useState({});
    const [realtimeStockDetails, setRealtimeStockDetails] = useState({});
    const [quarterlyStockDetails, setQuarterlyStockDetails] = useState({});
    const [stockName, setStockName] = useState('');
    const [graphData, setGraphData] = useState('');
    const [isWatchlistDataLoading, setIsWatchlistDataLoading] =
        useStateWithCallbackLazy(false);
    const [isStockInfoTableLoading, setIsStockInfoTableLoading] =
        useStateWithCallbackLazy(false);
    const [isRealtimeDataLoading, setIsRealtimeDataLoading] =
        useStateWithCallbackLazy(false);
    const [isQuarterlyDataLoading, setIsQuarterlyDataLoading] =
        useStateWithCallbackLazy(false);
    const [isStockGraphLoading, setIsStockGraphLoading] =
        useStateWithCallbackLazy(false);

    const getBasicStockInfo = () => {
        setIsStockInfoTableLoading(true, () => {
            axios.get(`/stock-details/`).then((response) => {
                setBasicStockInfo(response.data);
                setIsStockInfoTableLoading(false, null);
            });
        });
    };

    const getWatchlistStockInfo = (watchlist) => {
        const tickerString = watchlist.join('-');
        if (!tickerString) return setWatchlistStockInfo([]);

        setIsWatchlistDataLoading(true, () => {
            axios.get(`/stock-details/${tickerString}`).then((response) => {
                setWatchlistStockInfo(response.data);
                setIsWatchlistDataLoading(false, null);
            });
        });
    };

    const setSymbol = (stockSymbol) => {
        axios.get(`/stock-details/${stockSymbol}`).then((response) => {
            setStockDetails(response.data);
        });
    };

    const setRealtimeDetails = (ticker) => {
        setIsRealtimeDataLoading(true, () => {
            axios
                .get(`/stock-details/realtime-data/${ticker}`)
                .then((response) => {
                    setRealtimeStockDetails(response.data.stock_details);
                    setStockName(response.data.stock_name);
                    setIsRealtimeDataLoading(false, null);
                });
        });
    };

    const setQuarterlyDetails = (ticker) => {
        setIsQuarterlyDataLoading(true, () => {
            axios
                .get(`/stock-details/quarterly-data/${ticker}`)
                .then((response) => {
                    setQuarterlyStockDetails(response.data.stock_details);
                    setStockName(response.data.stock_name);
                    setIsQuarterlyDataLoading(false, null);
                });
        });
    };

    const setRealtimeGraphData = (ticker) => {
        setIsStockGraphLoading(true, () => {
            axios.get(`/realtime-graph/${ticker}`).then((response) => {
                setGraphData(response.data);
                setIsStockGraphLoading(false, null);
            });
        });
    };

    const filterStocks = (key_word) => {
        axios
            .post(
                '/stock-details/filter-stocks',
                JSON.stringify({
                    key_word,
                }),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                setBasicStockInfo(response.data);
            });
    };

    const sortStocks = (stock_list, table_header_key, direction, setInfo) => {
        const ticker_list = stock_list.map(({ ticker_id }) => ticker_id);
        axios
            .post(
                '/stock-details/sort-stocks',
                JSON.stringify({
                    ticker_list,
                    table_header_key,
                    direction,
                }),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                setInfo(response.data);
            });
    };

    return (
        <StockInfoContext.Provider
            value={{
                stockName,
                stockDetails,
                realtimeStockDetails,
                quarterlyStockDetails,
                graphData,
                basicStockInfo,
                watchlistStockInfo,
                setBasicStockInfo,
                setWatchlistStockInfo,
                isWatchlistDataLoading,
                isStockInfoTableLoading,
                isRealtimeDataLoading,
                isStockGraphLoading,
                isQuarterlyDataLoading,
                getWatchlistStockInfo,
                getBasicStockInfo,
                setRealtimeDetails,
                setQuarterlyDetails,
                setRealtimeGraphData,
                setSymbol,
                filterStocks,
                sortStocks,
            }}
        >
            {children}
        </StockInfoContext.Provider>
    );
};

export const useStockSymbol = () => useContext(StockInfoContext);

export default StockInfoProvider;
