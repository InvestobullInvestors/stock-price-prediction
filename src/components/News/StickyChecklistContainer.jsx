import { Divider, VStack } from '@chakra-ui/react';
import NewsChecklist from './NewsChecklist';
import React from 'react';
import CustomBox from '../CustomBox';
import StockNewsChecklist from './StockNewsChecklist';
import { useStockNews } from '../../contexts/useStockNews';
import CustomButtonGroup from '../CustomButtonGroup';

const StickyChecklistContainer = () => {
    const { isDisplayingWatchlistStockNews } = useStockNews();

    return (
        <CustomBox p="4" mt={5} ml={-1} position="fixed" zIndex={100}>
            <VStack>
                <CustomButtonGroup />
                <Divider orientation="horizontal" />
                {isDisplayingWatchlistStockNews ? (
                    <StockNewsChecklist />
                ) : (
                    <NewsChecklist />
                )}
            </VStack>
        </CustomBox>
    );
};

export default StickyChecklistContainer;
