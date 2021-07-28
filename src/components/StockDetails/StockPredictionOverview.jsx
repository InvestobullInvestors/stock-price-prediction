import React from 'react'
import {Box, useColorModeValue} from "@chakra-ui/react";
import {Line} from "react-chartjs-2";
import {useStockSymbol} from "../../contexts/useStockInfo";

const StockDataGraph = () => {
    const {graphData} = useStockSymbol()
    return (
        <Box w='80%' mt={8} p={4} bgColor={useColorModeValue("brand.100", "brand.200")} borderRadius='xl'
             marginX='auto'>
            <Line data={graphData}/>
        </Box>
    )
}

export default StockDataGraph;
