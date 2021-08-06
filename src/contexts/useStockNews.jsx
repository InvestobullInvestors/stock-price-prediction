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
        console.log(source);
        console.log(source.selected);
        const newNewsInfo = [...newsInfo];
        const sourceIndex = newsInfo.findIndex(({ id }) => id === source.id);
        source.selected = !source.selected;
        console.log(source.selected);
        newNewsInfo[sourceIndex] = source;
        console.log(newNewsInfo);
        setNewsInfo(newNewsInfo);
        // console.log(source.selected);
        // newsInfo[sourceIndex] = source;
        // const newList = newsInfo;
        // console.log(newList);
        // this.setState({ newList });
        // this.setState({
        //     data: newsInfo.data.map((currSource) =>
        //         currSource.id === source.id
        //             ? { ...currSource, selected: false }
        //             : currSource
        //     ),
        // });
    };

    const selectAllSources = () => {
        newsInfo.forEach((source) => (source.selected = true));
    };

    const unselectAllSources = () => {
        newsInfo.forEach((source) => (source.selected = false));
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
