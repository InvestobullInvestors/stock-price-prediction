import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { defaults, Line } from 'react-chartjs-2';
import { useStockSymbol } from '../../contexts/useStockInfo';
import LoadingSpinner from '../LoadingSpinner';
import CustomBox from '../CustomBox';

const StockDataGraph = () => {
    const { graphData, isStockGraphLoading } = useStockSymbol();
    defaults.color = useColorModeValue('#000', '#FFF');
    defaults.borderColor = useColorModeValue('#CCC', '#555');

    return (
        <CustomBox bgColor={useColorModeValue('brand.100', 'brand.700')}>
            {isStockGraphLoading ? (
                <LoadingSpinner />
            ) : (
                <Line data={graphData} />
            )}
        </CustomBox>
    );
};

export default StockDataGraph;
