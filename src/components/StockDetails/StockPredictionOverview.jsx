import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { defaults, Line } from 'react-chartjs-2';
import { useStockSymbol } from '../../contexts/useStockInfo';
import LoadingSpinner from '../LoadingSpinner';

const StockDataGraph = () => {
    const { graphData, isStockGraphLoading } = useStockSymbol();
    defaults.color = useColorModeValue('#000', '#FFF');
    defaults.borderColor = useColorModeValue('#CCC', '#555');

    return (
        <Box
            mt={10}
            p={4}
            bgColor={useColorModeValue('brand.100', 'brand.700')}
            borderRadius="lg"
        >
            {isStockGraphLoading ? (
                <LoadingSpinner />
            ) : (
                <Line data={graphData} />
            )}
        </Box>
    );
};

export default StockDataGraph;
