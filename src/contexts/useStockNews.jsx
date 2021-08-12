import React, { createContext, useContext, useState } from 'react';
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
    const [
        isNewsSelectionsFromMongoLoading,
        setIsNewsSelectionsFromMongoLoading,
    ] = useStateWithCallbackLazy(false);

    const setNews = (stockSymbol) => {
        setIsStockNewsLoading(true, () => {
            axios.get(`/stock-news/news/${stockSymbol}`).then((response) => {
                setStockNews(response.data.news);
                setIsStockNewsLoading(false, null);
            });
        });
    };

    const getStockListNews = (stockSymbols) => {
        setIsStockNewsLoading(true, () => {
            axios
                .post(`/stock-news/stocks`, JSON.stringify({ stockSymbols }), {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then((response) => {
                    setStockListNews(response.data);
                    setIsStockNewsLoading(false, null);
                });
        });
    };

    const setNewsInfoFromMongo = () => {
        setIsNewsSelectionsFromMongoLoading(true, () => {
            axios.get('/stock-news/news-source-info').then((response) => {
                setNewsInfo(response.data);
                setIsNewsSelectionsFromMongoLoading(false, null);
            });
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

    const reorderSources = (startIndex, endIndex) => {
        const newList = [...newsInfo];
        const [removed] = newList.splice(startIndex, 1);
        newList.splice(endIndex, 0, removed);
        setNewsInfo(newList);
    };

    const selectStock = (stock) => {
        const newStockListNews = [...stockListNews];
        const stockIndex = stockListNews.findIndex(
            ({ ticker_id }) => ticker_id === stock.ticker_id
        );
        stock.selected = !stock.selected;
        newStockListNews[stockIndex] = stock;
        setStockListNews(newStockListNews);
    };

    const selectAllStocks = () => {
        const newStockListNews = [...stockListNews];
        newStockListNews.forEach((stock) => (stock.selected = true));
        setStockListNews(newStockListNews);
    };

    const unselectAllStocks = () => {
        const newStockListNews = [...stockListNews];
        newStockListNews.forEach((stock) => (stock.selected = false));
        setStockListNews(newStockListNews);
    };

    const reorderStocks = (startIndex, endIndex) => {
        const newList = [...stockListNews];
        const [removed] = newList.splice(startIndex, 1);
        newList.splice(endIndex, 0, removed);
        setStockListNews(newList);
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
                isNewsSelectionsFromMongoLoading,
                setDisplayWatchlistNews,
                setNewsInfoFromMongo,
                getStockListNews,
                setNews,
                reorderSources,
                selectSource,
                selectAllSources,
                unselectAllSources,
                reorderStocks,
                selectStock,
                selectAllStocks,
                unselectAllStocks,
            }}
        >
            {children}
        </StockNewsContext.Provider>
    );
};

export const useStockNews = () => useContext(StockNewsContext);
export default StockNewsProvider;
