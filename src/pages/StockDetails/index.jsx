import React, {useEffect} from "react";
import {useColorModeValue} from "@chakra-ui/react";
import PageTemplate from "../../components/NavbarFooter/PageTemplate";
import StockInformation from "../../components/StockInformation";
import StockNews from "../../components/StockNews";
import StockPredictionDetails from "../../components/StockPredictionDetails";
import StockPredictionOverview from "../../components/StockPredictionOverview";
import {usePrediction} from "../../contexts/usePredictions";
import {useStockSymbol} from "../../contexts/useStockInfo";
import {useStockNews} from "../../contexts/useStockNews";

const StockDetails = ({match}) => {
    const tickerId = match.params.tickerId;
    const {setSymbol} = useStockSymbol();
    const {setPrediction} = usePrediction();
    const {setNews} = useStockNews();

    useEffect(() => {
        setSymbol(tickerId);
        setPrediction(tickerId);
        setNews(tickerId);
    }, [tickerId]);

    return (
        <PageTemplate bgColor={useColorModeValue("brand.300", "brand.800")}>
            <StockInformation/>
            <StockPredictionOverview/>
            <StockPredictionDetails/>
            <StockNews/>
        </PageTemplate>
    )
}

export default StockDetails;
