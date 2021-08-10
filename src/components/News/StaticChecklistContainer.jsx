import {
    Button,
    Divider,
    HStack,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import NewsChecklist from './NewsChecklist';
import React from 'react';
import CustomBox from '../CustomBox';
import StockNewsChecklist from './StockNewsChecklist';
import { useStockNews } from '../../contexts/useStockNews';
import { useUser } from '../../contexts/useUser';

const StaticChecklistContainer = () => {
    const boxColor = useColorModeValue('brand.400', 'brand.700');
    const { isDisplayingWatchlistStockNews, setDisplayWatchlistNews } =
        useStockNews();
    const { user } = useUser();

    return (
        <CustomBox p="4" ml="2" mt={5} bgColor={boxColor}>
            <VStack>
                <HStack>
                    <Button
                        colorScheme="brand"
                        onClick={() => setDisplayWatchlistNews(false)}
                    >
                        Sources
                    </Button>
                    <Button
                        colorScheme="brand"
                        onClick={() => setDisplayWatchlistNews(true)}
                        isDisabled={!user}
                    >
                        Watchlist Stocks
                    </Button>
                </HStack>
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

export default StaticChecklistContainer;
