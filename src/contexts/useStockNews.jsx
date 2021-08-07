import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

const StockNewsContext = createContext({});

const StockNewsProvider = ({ children }) => {
    const [stockNews, setStockNews] = useState([]);
    const [stockListNews, setStockListNews] = useState([]);
    const [newsSelections, setNewsSelections] = useState([]);
    const [newsInfo, setNewsInfo] = useState([]);
    const [isStockNewsLoading, setIsStockNewsLoading] =
        useStateWithCallbackLazy(false);
    const [isDisplayingWatchlistStockNews, setDisplayingWatchlistStockNews] =
        useState(false);
  
    const setNews = (stockSymbol) => {
        setIsStockNewsLoading(true, () => {
            axios.get(`/stock-news/news/${stockSymbol}`).then((response) => {
                setStockNews(response.data.news);
                setIsStockNewsLoading(false, null);
            });
        });
    };

    const getStockListNews = (stockSymbols) => {
        axios
            .post(
                `/stock-news/stocks`,
                JSON.stringify({
                    stockSymbols,
                }),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                setStockListNews(response.data);
            });
    };

    const setNewsSelectionsFromFirebase = () => {
        axios.get('/stock-news/newsSourceList').then((response) => {
            setNewsSelections(response.data);
        });
    };

    const setNewsInfoFromMongo = () => {
        axios.get('/stock-news/newsSourceInfo').then((response) => {
            setNewsInfo(response.data);
        });
    };

    const reorderNews = (sources) => {
        axios.post('/stock-news/reorderNews', { sources }).then((response) => {
            setNewsSelections(response.data);
        });
    };

    const selectSource = (source) => {
        axios.post('/stock-news/selectSource', { source }).then((response) => {
            setNewsSelections(response.data);
        });
    };

    const selectAllSources = () => {
        axios.post('/stock-news/selectAllSources').then((response) => {
            setNewsSelections(response.data);
        });
    };

    const unselectAllSources = () => {
        axios.post('/stock-news/unselectAllSources').then((response) => {
            setNewsSelections(response.data);
        });
    };

    const setDisplayWatchlistNews = (state) => {
        setDisplayingWatchlistStockNews(state);
    };

    return (
        <StockNewsContext.Provider
            value={{
                stockNews,
                stockListNews,
                newsSelections,
                newsInfo,
                isStockNewsLoading,
                isDisplayingWatchlistStockNews,
                setDisplayWatchlistNews,
                setNewsSelectionsFromFirebase,
                setNewsInfoFromMongo,
                getStockListNews,
                setNews,
                reorderNews,
                selectSource,
                selectAllSources,
                unselectAllSources,
            }}
        >
            {children}
        </StockNewsContext.Provider>
    );
};

export const useStockNews = () => useContext(StockNewsContext);
export default StockNewsProvider;
