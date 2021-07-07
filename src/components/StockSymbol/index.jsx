import WatchlistButton from '../WatchlistButton';
import { Link, HStack, useColorModeValue, Th, VStack } from '@chakra-ui/react';

const StockSymbol = ({ ticker }) => {
    const color = useColorModeValue('blue', 'blue.400');

    return (
        <HStack spacing='24px'>
            <WatchlistButton symbol={ticker} />
            <Link
                href={'/stock-details/' + ticker}
                color={color}
                fontWeight='bold'
            >
                {ticker}
            </Link>
        </HStack>
    );
};

export default StockSymbol;
