import React, {createContext, useContext, useState} from "react";
import axios from "axios";

const StockNewsContext = createContext({});

const StockNewsProvider = ({children}) => {
    const [stockNews, setStockNews] = useState([]);
    const [newsSelections, setNewsSelections] = useState([]);
    const [newsMasterlist, setNewsMasterlist] = useState([]);

    const setNews = (stockSymbol) => {
        axios
            .get(`/stock-news/news/${stockSymbol}`)
            .then((response) => {
                setStockNews(response.data.news);
            });
    };

    const setNewsSelectionsFromFirebase = () => {
        axios
            .get('/stock-news/newsSelections')
            .then((response) => {
                setNewsSelections(response.data);
            });
    };

    const setNewsMasterlistFromMongo = () => {
        axios
            .get('/stock-news/newsMasterlist')
            .then((response) => {
                setNewsMasterlist(response.data);
            });
    };

    const reorderNews = (sources) => {
        axios
            .post('/stock-news/reorderNews', {sources})
            .then((response) => {
                setNewsSelections(response.data);
            });
    };

    const selectSource = (source) => {
        axios
            .post('/stock-news/selectSource', {source})
            .then((response) => {
                setNewsSelections(response.data);
            });
    };

    const selectAllSources = () => {
        axios
            .post('/stock-news/selectAllSources')
            .then((response) => {
                setNewsSelections(response.data);
            });
    };

    const unselectAllSources = () => {
        axios
            .post('/stock-news/unselectAllSources')
            .then((response) => {
                setNewsSelections(response.data);
            });
    };

    return (
        <StockNewsContext.Provider
            value={{
                stockNews,
                newsSelections,
                newsMasterlist,
                setNewsSelectionsFromFirebase,
                setNewsMasterlistFromMongo,
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
