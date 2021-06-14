import React from "react";
import {useColorModeValue} from "@chakra-ui/react";
import PageTemplate from "../../components/PageTemplate";
import StockInformation from "../../components/StockInformation";
import StockInfoProvider from "../../hooks/useStockInfo";
import StockPredictionDetails from "../../components/StockPredictionDetails"

const StockDetails = () => (
    <StockInfoProvider>
        <PageTemplate bgColor={useColorModeValue("brand.300", "brand.800")}>
            <StockInformation/>
            <StockPredictionDetails/>
        </PageTemplate>
    </StockInfoProvider>
)

export default StockDetails;