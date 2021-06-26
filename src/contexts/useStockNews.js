import React, {createContext, useContext, useState} from "react";
import axios from "axios";

const StockNewsContext = createContext({})

const StockNewsProvider = ({children}) => {
    const [stockNews, setStockNews] = useState([]);

    const setNews = (stockSymbol) => {
        axios.get(`http://localhost:3000/stock-news/${stockSymbol}`).then((response) => {
            setStockNews(response.data.news);
        })
    }

    return (
        <StockNewsContext.Provider value={{stockNews, setNews}}>
            {children}
        </StockNewsContext.Provider>
    )
}

export const useStockNews = () => (
    useContext(StockNewsContext)
)

export default StockNewsProvider;
