import React, {createContext, useContext, useState} from 'react'
import axios from "axios";

const StockInfoContext = createContext({});

const StockInfoProvider = ({children}) => {
    const [stockDetails, setStockDetails] = useState({});
    const [realtimeStockDetails, setRealtimeStockDetails] = useState({});
    const [quarterlyStockDetails, setQuarterlyStockDetails] = useState({});
    const [stockName, setStockName] = useState('')

    const setSymbol = (stockSymbol) => {
        axios.get(`http://localhost:3000/stock-details/${stockSymbol}`).then((response) => {
            setStockDetails(response.data);
        })
    }

    const setRealtimeDetails = ticker => {
        axios.get(`http://localhost:3000/stock-details/realtime-data/${ticker}`).then((response) => {
            setRealtimeStockDetails(response.data.stock_details);
            setStockName(response.data.stock_name)
        })
    }

    const setQuarterlyDetails = ticker => {
        axios.get(`http://localhost:3000/stock-details/quarterly-data/${ticker}`).then((response) => {
            setQuarterlyStockDetails(response.data.stock_details);
            setStockName(response.data.stock_name)
        })
    }

    return (
        <StockInfoContext.Provider value={{
            stockName,
            stockDetails,
            realtimeStockDetails,
            quarterlyStockDetails,
            setRealtimeDetails,
            setQuarterlyDetails,
            setSymbol
        }}>
            {children}
        </StockInfoContext.Provider>
    )
}

export const useStockSymbol = () => (
    useContext(StockInfoContext)
)

export default StockInfoProvider;
