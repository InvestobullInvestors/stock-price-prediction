import WatchlistButton from '../WatchlistButton';
import {HStack, Link, useColorModeValue} from '@chakra-ui/react';
import {Link as ReactRouterLink} from 'react-router-dom';

const StockSymbol = ({ ticker }) => {
    const blueColor = useColorModeValue('blue.light', 'blue.dark');

    return (
        <HStack spacing='24px'>
            <WatchlistButton symbol={ticker} />
            <Link
                as={ReactRouterLink}
                to={`/stock-details/${ticker}`}
                color={blueColor}
                fontWeight='bold'
            >
                {ticker}
            </Link>
        </HStack>
    );
};

export default StockSymbol;
