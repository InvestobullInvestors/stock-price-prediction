import {
    Divider,
    Radio,
    RadioGroup,
    Stack,
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
    const [value, setValue] = React.useState('1');
    const boxColor = useColorModeValue('brand.400', 'brand.700');

    const {
        isDisplayingWatchlistStockNews,
        setDisplayWatchlistNews,
    } = useStockNews();
    const { user } = useUser();

    return (
        <CustomBox
            p="4"
            mt={5}
            ml={-1}
            bgColor={boxColor}
            position="fixed"
            boxShadow="dark-lg"
            zIndex={100}
        >
            <VStack>
                <RadioGroup onChange={setValue} value={value}>
                    <Stack direction="row">
                        <Radio
                            value="1"
                            onChange={() => setDisplayWatchlistNews(false)}
                        >
                            Sources
                        </Radio>
                        <Radio
                            value="2"
                            onChange={() => setDisplayWatchlistNews(true)}
                        >
                            Watchlist Stocks
                        </Radio>
                    </Stack>
                </RadioGroup>
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
