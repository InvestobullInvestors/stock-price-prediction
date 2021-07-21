import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const StockListContext = createContext({});

const StockListProvider = ({ children }) => {
    const [stocks, setStocks] = useState([]);

    const setStockList = () => {
        axios.get(`http://localhost:3000/`).then((response) => {
            setStocks(response.data);
        });
    };

    return (
        <StockListContext.Provider value={{ stocks, setStockList }}>
            {children}
        </StockListContext.Provider>
    );
};

export const useStockList = () => useContext(StockListContext);

export default StockListProvider;
