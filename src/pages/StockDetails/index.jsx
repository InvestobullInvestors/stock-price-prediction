import React from "react";
import {useColorModeValue} from "@chakra-ui/react";
import PageTemplate from "../../components/PageTemplate";
import StockInformation from "../../components/StockInformation";
import StockPredictionDetails from "../../components/StockPredictionDetails"
import {useStockSymbol} from "../../hooks/useStockInfo";

const StockDetails = ({match}) => {
    const tickerId = match.params.tickerId;
    const {setSymbol} = useStockSymbol();
    setSymbol(tickerId);

    return (
        <PageTemplate bgColor={useColorModeValue("brand.300", "brand.800")}>
            <StockInformation/>
            <StockPredictionDetails/>
        </PageTemplate>
    )
}

export default StockDetails;