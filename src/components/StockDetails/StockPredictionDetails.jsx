import React from "react";
import {Grid, useColorModeValue} from "@chakra-ui/react";
import PredictionSlider from "./PredictionSlider";
import {usePrediction} from "../../contexts/usePredictions";

const StockPredictionDetails = () => {
    const {predictedValue} = usePrediction();
    const {inflation, revenueGrowth, eps, marketCap} = predictedValue;
    return (
        <Grid mt={10} p={8} templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)"}}
              templateRows={{base: "repeat(2, 1fr)", lg: "repeat(1, 1fr)"}} borderRadius="lg" gap={8}
              bgColor={useColorModeValue("brand.100", "brand.700")}>
            <PredictionSlider value={inflation} tag="Inflation"/>
            <PredictionSlider value={revenueGrowth} tag="Revenue Growth"/>
            <PredictionSlider value={eps} tag="EPS"/>
            <PredictionSlider value={marketCap} tag="Market Cap (in million)"/>
        </Grid>
    )
}

export default StockPredictionDetails;
