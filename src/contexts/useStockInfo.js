import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from "axios";

const StockInfoContext = createContext({});

const StockInfoProvider = ({children}) => {
    const [stockDetails, setStockDetails] = useState({});
    const [realtimeStockDetails, setRealtimeStockDetails] = useState({});
    const [quarterlyStockDetails, setQuarterlyStockDetails] = useState({});
    const [stockName, setStockName] = useState('')
    const [graphData, setGraphData] = useState('')
    const [basicStockInfo, setBasicStockInfo] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/stock-details/`).then(response => {
            setBasicStockInfo(response.data)
        })
    }, []);


    const setSymbol = (stockSymbol) => {
        axios.get(`http://localhost:3000/stock-details/${stockSymbol}`).then(response => {
            setStockDetails(response.data);
        })
    }

    const setRealtimeDetails = ticker => {
        axios.get(`http://localhost:3000/stock-details/realtime-data/${ticker}`).then(response => {
            setRealtimeStockDetails(response.data.stock_details);
            setStockName(response.data.stock_name)
        })
    }

    const setQuarterlyDetails = ticker => {
        axios.get(`http://localhost:3000/stock-details/quarterly-data/${ticker}`).then(response => {
            setQuarterlyStockDetails(response.data.stock_details);
            setStockName(response.data.stock_name)
        })
    }

    const setRealtimeGraphData = ticker => {
        axios.get(`http://localhost:3000/realtime-graph/${ticker}`).then(response => {
            setGraphData(response.data);
        })
    }

    const filterStocks = key_word => {
        axios.post('http://localhost:3000/stock-details/filter-stocks', JSON.stringify({
            key_word
        }), {headers: {'Content-Type': 'application/json'}}).then(response => {
            setBasicStockInfo(response.data)
        })
    }

    return (
        <StockInfoContext.Provider value={{
            stockName,
            stockDetails,
            realtimeStockDetails,
            quarterlyStockDetails,
            graphData,
            basicStockInfo,
            setRealtimeDetails,
            setQuarterlyDetails,
            setRealtimeGraphData,
            setSymbol,
            filterStocks
        }}>
            {children}
        </StockInfoContext.Provider>
    )
}

export const useStockSymbol = () => (
    useContext(StockInfoContext)
)

export default StockInfoProvider;
