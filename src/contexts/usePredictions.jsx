import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

const PredictionContext = createContext({});

const PredictionProvider = ({ children }) => {
    const [predictedValue, setPredictedValue] = useState({});
    const [isPredictionLoading, setIsPredictionLoading] =
        useStateWithCallbackLazy(false);

    const setPrediction = (stockSymbol) => {
        setIsPredictionLoading(true, () => {
            axios
                .get(`/stock-prediction/${stockSymbol}`)
                .then((response) => {
                    setPredictedValue(response.data);
                })
                .catch(({ message }) => {
                    console.log(message);
                })
                .finally((_) => {
                    setIsPredictionLoading(false, null);
                });
        });
    };

    const setInflation = (inflation) => {
        predictedValue['inflation'] = inflation;
    };

    const setRevenueGrowth = (revenueGrowth) => {
        predictedValue['revenueGrowth'] = revenueGrowth;
    };

    const setEps = (eps) => {
        predictedValue['eps'] = eps;
    };

    const setMarketCap = (marketCap) => {
        predictedValue['marketCap'] = marketCap;
    };

    return (
        <PredictionContext.Provider
            value={{
                predictedValue,
                isPredictionLoading,
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
