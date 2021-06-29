import React, {createContext, useContext, useState} from 'react'
import axios from "axios";

const StockInfoContext = createContext({});

const StockInfoProvider = ({children}) => {
    const [stockDetails, setStockDetails] = useState({});

    const setSymbol = (stockSymbol) => {
        axios.get(`http://localhost:3000/stock-details/${stockSymbol}`).then((response) => {
            setStockDetails(response.data);
        })
    }

    return (
        <StockInfoContext.Provider value={{stockDetails, setSymbol}}>
            {children}
        </StockInfoContext.Provider>
    )
}

export const useStockSymbol = () => (
    useContext(StockInfoContext)
)

export default StockInfoProvider;
