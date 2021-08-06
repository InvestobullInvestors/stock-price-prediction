import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

const StockNewsContext = createContext({});

const StockNewsProvider = ({ children }) => {
    const [stockNews, setStockNews] = useState([]);
    const [newsInfo, setNewsInfo] = useState([]);
    const [
        isStockNewsLoading,
        setIsStockNewsLoading,
    ] = useStateWithCallbackLazy(false);

    const setNews = (stockSymbol) => {
        setIsStockNewsLoading(true, () => {
            axios.get(`/stock-news/news/${stockSymbol}`).then((response) => {
                setStockNews(response.data.news);
                setIsStockNewsLoading(false, null);
            });
        });
    };

    const setNewsInfoFromMongo = () => {
        axios.get('/stock-news/newsSourceInfo').then((response) => {
            setNewsInfo(response.data);
        });
    };

    const reorderNews = (sources) => {
        axios.post('/stock-news/reorderNews', { sources }).then((response) => {
            setNewsInfo(response.data);
        });
    };

    const selectSource = (source) => {
        const newNewsInfo = [...newsInfo];
        const sourceIndex = newsInfo.findIndex(({ id }) => id === source.id);
        source.selected = !source.selected;
        newNewsInfo[sourceIndex] = source;
        setNewsInfo(newNewsInfo);
    };

    const selectAllSources = () => {
        const newNewsInfo = [...newsInfo];
        newNewsInfo.forEach((source) => (source.selected = true));
        setNewsInfo(newNewsInfo);
    };

    const unselectAllSources = () => {
        const newNewsInfo = [...newsInfo];
        newNewsInfo.forEach((source) => (source.selected = false));
        setNewsInfo(newNewsInfo);
    };

    const getNewsSourceList = () => {
        axios.get('/stock-news/newsSourceList').then((response) => {
            setNewsInfo(response.data);
        });
    };

    return (
        <StockNewsContext.Provider
            value={{
                stockNews,
                newsInfo,
                isStockNewsLoading,
                setNewsInfoFromMongo,
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
