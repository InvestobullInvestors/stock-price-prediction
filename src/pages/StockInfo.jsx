import React, { useEffect } from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import { useColorModeValue } from "@chakra-ui/react";
import StockInformation from "../components/StockDetails/StockInformation";
import StockNews from "../components/StockDetails/StockNews";
import StockPredictionDetails from "../components/StockDetails/StockPredictionDetails";
import StockDataGraph from "../components/StockDetails/StockPredictionOverview";
import { usePrediction } from "../contexts/usePredictions";
import { useStockSymbol } from "../contexts/useStockInfo";
import { useStockNews } from "../contexts/useStockNews";

const StockDetails = ({ match }) => {
    const { tickerId } = match.params;
    const { setRealtimeDetails, setQuarterlyDetails, setRealtimeGraphData } =
        useStockSymbol();
    const { setPrediction } = usePrediction();
    const { setNews } = useStockNews();

    useEffect(() => {
        setRealtimeDetails(tickerId);
        setQuarterlyDetails(tickerId);
        setRealtimeGraphData(tickerId);
        setPrediction(tickerId);
        setNews(tickerId);
    }, [tickerId]);

    return (
        <PageTemplate bgColor={useColorModeValue("brand.300", "brand.800")}>
            <StockInformation />
            <StockDataGraph />
            <StockPredictionDetails />
            <StockNews />
        </PageTemplate>
    );
};

export default StockDetails;
