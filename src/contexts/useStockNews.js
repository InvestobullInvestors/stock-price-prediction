import React, {createContext, useContext, useState} from "react";
import axios from "axios";

const StockNewsContext = createContext({})

const StockNewsProvider = ({children}) => {
    const [stockNews, setStockNews] = useState([]);
    const [allNewsSources, setAllNewsSources] = useState([]);
    const [allNewsInfo, setAllNewsInfo] = useState([]);

    const setNews = (stockSymbol) => {
        axios.get(`http://localhost:3000/stock-news/news/${stockSymbol}`).then((response) => {
            setStockNews(response.data.news);
        })
    }

    const setNewsSources = () => {
        axios.get(`http://localhost:3000/stock-news/allNewsSources`).then((response) => {
            setAllNewsSources(response.data);
        })
    }

    const setNewsInfo = () => {
        axios.get('http://localhost:3000/stock-news/allNewsInfo').then((response) => {
            setAllNewsInfo(response.data);
        })
    }

    const resetNews = (sources) => {
        axios.post(`http://localhost:3000/stock-news/resetNews`, {sources}).then((response) => {
            setAllNewsSources(response.data);
        })
    }

    return (
        <StockNewsContext.Provider value={{stockNews, allNewsSources, allNewsInfo, setNewsInfo, setNewsSources, setNews, resetNews}}>
            {children}
        </StockNewsContext.Provider>
    )
}

export const useStockNews = () => (
    useContext(StockNewsContext)
)

export default StockNewsProvider;
