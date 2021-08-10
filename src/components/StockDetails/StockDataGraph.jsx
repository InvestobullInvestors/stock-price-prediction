import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { defaults, Line } from 'react-chartjs-2';
import { useStockSymbol } from '../../contexts/useStockInfo';
import LoadingSpinner from '../LoadingSpinner';
import CustomBox from '../CustomBox';

const StockDataGraph = ({ ...otherProps }) => {
    const { graphData, isStockGraphLoading } = useStockSymbol();
    defaults.color = useColorModeValue('#000', '#DDD');
    defaults.borderColor = useColorModeValue('#DDD', '#333');

    return (
        <CustomBox {...otherProps}>
            {isStockGraphLoading ? (
                <LoadingSpinner />
            ) : (
                <Line data={graphData} />
            )}
        </CustomBox>
    );
};

export default StockDataGraph;
