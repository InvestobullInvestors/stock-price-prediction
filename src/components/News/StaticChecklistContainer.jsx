import {
    Button,
    ButtonGroup,
    Divider,
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
    const { user } = useUser();
    const [value, setValue] = React.useState(0);
    const boxColor = useColorModeValue('brand.400', 'brand.700');

    const { isDisplayingWatchlistStockNews, setDisplayWatchlistNews } =
        useStockNews();

    return (
        <CustomBox
            p="4"
            mt={5}
            ml={-1}
            bgColor={boxColor}
            position="fixed"
            zIndex={100}
        >
            <VStack>
                <ButtonGroup isAttached colorScheme="brand">
                    <Button
                        value={0}
                        mr="-px"
                        onClick={() => {
                            setValue(0);
                            setDisplayWatchlistNews(false);
                        }}
                        opacity={value === 0 ? '1' : '0.5'}
                    >
                        Sources
                    </Button>
                    <Button
                        value={1}
                        mr="-px"
                        onClick={() => {
                            setValue(1);
                            setDisplayWatchlistNews(true);
                        }}
                        opacity={value === 1 ? '1' : '0.5'}
                        isDisabled={!user}
                        title={user ? null : 'Log In to view this section.'}
                    >
                        Watchlist Stocks
                    </Button>
                </ButtonGroup>
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
