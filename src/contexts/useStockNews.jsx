import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

const StockNewsContext = createContext({});

const StockNewsProvider = ({ children }) => {
    const [stockNews, setStockNews] = useState([]);
    const [stockListNews, setStockListNews] = useState([]);
    const [newsInfo, setNewsInfo] = useState([]);
    const [
        isStockNewsLoading,
        setIsStockNewsLoading,
    ] = useStateWithCallbackLazy(false);
    const [
        isDisplayingWatchlistStockNews,
        setDisplayingWatchlistStockNews,
    ] = useState(false);

    const setNews = (stockSymbol) => {
        setIsStockNewsLoading(true, () => {
            axios.get(`/stock-news/news/${stockSymbol}`).then((response) => {
                setStockNews(response.data.news);
                setIsStockNewsLoading(false, null);
            });
        });
    };

    const setNewsInfoFromMongo = () => {
        axios.get('/stock-news/news-source-info').then((response) => {
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

    const reorderSources = (reorderedList) => {
        setNewsInfo(reorderedList);
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

    const setDisplayWatchlistNews = (state) => {
        setDisplayingWatchlistStockNews(state);
    };

    return (
        <StockNewsContext.Provider
            value={{
                newsInfo,
                stockNews,
                stockListNews,
                isStockNewsLoading,
                isDisplayingWatchlistStockNews,
                setDisplayWatchlistNews,
                setNewsInfoFromMongo,
                getStockListNews,
                setNews,
                reorderSources,
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
