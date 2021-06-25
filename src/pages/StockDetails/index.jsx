import React, {useEffect} from "react";
import {useColorModeValue} from "@chakra-ui/react";
import PageTemplate from "../../components/PageTemplate";
import StockInformation from "../../components/StockInformation";
import {useStockSymbol} from "../../hooks/useStockInfo";
import StockPredictionOverview from "../../components/StockPredictionOverview";
import StockPredictionDetails from "../../components/StockPredictionDetails";
import {usePrediction} from "../../hooks/usePredictions";

const StockDetails = ({match}) => {
    const tickerId = match.params.tickerId;
    const {setSymbol} = useStockSymbol();
    const {setPrediction} = usePrediction();

    useEffect(() => {
        setSymbol(tickerId);
        setPrediction(tickerId);
    }, [tickerId]);

    return (
        <PageTemplate bgColor={useColorModeValue("brand.300", "brand.800")}>
            <StockInformation/>
            <StockPredictionOverview/>
            <StockPredictionDetails/>
        </PageTemplate>
    )
}

export default StockDetails;
