import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useStockNews } from '../contexts/useStockNews';
import { useUser } from '../contexts/useUser';

const CustomButtonGroup = () => {
    const { user } = useUser();
    const {
        isDisplayingWatchlistStockNews,
        setDisplayWatchlistNews,
    } = useStockNews();

    return (
        <ButtonGroup isAttached colorScheme="brand">
            <Button
                mr="-px"
                onClick={() => {
                    setDisplayWatchlistNews(false);
                }}
                opacity={isDisplayingWatchlistStockNews ? '0.5' : '1'}
            >
                Sources
            </Button>
            <Button
                mr="-px"
                onClick={() => {
                    setDisplayWatchlistNews(true);
                }}
                opacity={isDisplayingWatchlistStockNews ? '1' : '0.5'}
                isDisabled={!user}
                title={user ? null : 'Log in to view this section.'}
            >
                Watchlist Stocks
            </Button>
        </ButtonGroup>
    );
};
export default CustomButtonGroup;
