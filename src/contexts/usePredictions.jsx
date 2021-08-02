import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PredictionContext = createContext({});

const PredictionProvider = ({ children }) => {
    const [predictedValue, setPredictedValue] = useState({});

    const setPrediction = (stockSymbol) => {
        axios.get(`/stock-prediction/${stockSymbol}`).then((response) => {
            setPredictedValue(response.data);
        });
    };

    const setInflation = (inflation) => {
        predictedValue["inflation"] = inflation;
    };

    const setRevenueGrowth = (revenueGrowth) => {
        predictedValue["revenueGrowth"] = revenueGrowth;
    };

    const setEps = (eps) => {
        predictedValue["eps"] = eps;
    };

    const setMarketCap = (marketCap) => {
        predictedValue["marketCap"] = marketCap;
    };

    return (
        <PredictionContext.Provider
            value={{
                predictedValue,
                setInflation,
                setRevenueGrowth,
                setPrediction,
                setEps,
                setMarketCap,
            }}
        >
            {children}
        </PredictionContext.Provider>
    );
};

export const usePrediction = () => useContext(PredictionContext);

export default PredictionProvider;
