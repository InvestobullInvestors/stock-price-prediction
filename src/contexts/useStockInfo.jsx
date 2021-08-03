import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StockInfoContext = createContext({});

const StockInfoProvider = ({ children }) => {
    const [basicStockInfo, setBasicStockInfo] = useState([]);
    const [watchlistStockInfo, setWatchlistStockInfo] = useState([]);
    const [stockDetails, setStockDetails] = useState({});
    const [realtimeStockDetails, setRealtimeStockDetails] = useState({});
    const [quarterlyStockDetails, setQuarterlyStockDetails] = useState({});
    const [stockName, setStockName] = useState("");
    const [graphData, setGraphData] = useState("");

    useEffect(() => {
        axios.get(`/stock-details/`).then((response) => {
            setBasicStockInfo(response.data);
        });
    }, []);

    const getWatchlistStockInfo = (watchlist) => {
        const tickerString = watchlist.join("-");
        if (!tickerString) return setWatchlistStockInfo([]);

        axios.get(`/stock-details/${tickerString}`).then((response) => {
            setWatchlistStockInfo(response.data);
        });
    };

    const setSymbol = (stockSymbol) => {
        axios.get(`/stock-details/${stockSymbol}`).then((response) => {
            setStockDetails(response.data);
        });
    };

    const setRealtimeDetails = (ticker) => {
        axios.get(`/stock-details/realtime-data/${ticker}`).then((response) => {
            setRealtimeStockDetails(response.data.stock_details);
            setStockName(response.data.stock_name);
        });
    };

    const setQuarterlyDetails = (ticker) => {
        axios
            .get(`/stock-details/quarterly-data/${ticker}`)
            .then((response) => {
                setQuarterlyStockDetails(response.data.stock_details);
                setStockName(response.data.stock_name);
            });
    };

    const setRealtimeGraphData = (ticker) => {
        axios.get(`/realtime-graph/${ticker}`).then((response) => {
            setGraphData(response.data);
        });
    };

    const filterStocks = (key_word) => {
        axios
            .post(
                "/stock-details/filter-stocks",
                JSON.stringify({
                    key_word,
                }),
                { headers: { "Content-Type": "application/json" } }
            )
            .then((response) => {
                setBasicStockInfo(response.data);
            });
    };

    const sortStocks = (stock_list, table_header_key, setInfo) => {
        const ticker_list = stock_list.map(({ ticker_id }) => ticker_id);
        axios
            .post(
                "/stock-details/sort-stocks",
                JSON.stringify({
                    ticker_list,
                    table_header_key,
                }),
                { headers: { "Content-Type": "application/json" } }
            )
            .then((response) => {
                setInfo(response.data);
            });
    };

    return (
        <StockInfoContext.Provider
            value={{
                stockName,
                stockDetails,
                realtimeStockDetails,
                quarterlyStockDetails,
                graphData,
                basicStockInfo,
                watchlistStockInfo,
                setBasicStockInfo,
                setWatchlistStockInfo,
                getWatchlistStockInfo,
                setRealtimeDetails,
                setQuarterlyDetails,
                setRealtimeGraphData,
                setSymbol,
                filterStocks,
                sortStocks,
            }}
        >
            {children}
        </StockInfoContext.Provider>
    );
};

export const useStockSymbol = () => useContext(StockInfoContext);

export default StockInfoProvider;
