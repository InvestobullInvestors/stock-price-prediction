import React, { createContext, useContext, useState } from 'react';
import { stockInfo } from '../shared/stockInfo';

const StockListContext = createContext('');

const StockListProvider = ({ children }) => {
    const defaultDetails = {
        company_name: '',
        symbol: '',
        previous_close: 0,
        open: 0,
        last_price: 0,
        change: 0,
        change_percent: '',
        currency: '',
        volume: '',
        shares_owned: 0,
        avg_vol: '',
        market_cap: '',
    };
    const [stockDetails, setStockDetails] = useState(defaultDetails);

    const setSymbol = ({ stockSymbol }) => {
        const details = stockInfo.filter(
            (stock) => stock.symbol === stockSymbol
        );
        setStockDetails(details.length > 0 ? details : defaultDetails);
    };

    return (
        <StockListContext.Provider value={{ stockDetails, setSymbol }}>
            {children}
        </StockListContext.Provider>
    );
};

export const useStockSymbolList = () => useContext(StockListContext);

export default StockListProvider;
