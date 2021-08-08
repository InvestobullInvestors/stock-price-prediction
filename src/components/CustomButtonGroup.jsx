import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useStockNews } from '../contexts/useStockNews';
import { useUser } from '../contexts/useUser';

const CustomButtonGroup = () => {
    const { user } = useUser();
    const [value, setValue] = React.useState(0);
    const { setDisplayWatchlistNews } = useStockNews();

    return (
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
    );
};
export default CustomButtonGroup;
