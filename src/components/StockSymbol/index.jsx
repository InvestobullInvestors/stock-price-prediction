import WatchlistButton from '../WatchlistButton';
import { Link, HStack, useColorModeValue, Th, VStack } from '@chakra-ui/react';

const StockSymbol = ({ ticker }) => {
    const colorScheme = useColorModeValue('#007AFF', '#1489FF');

    return (
        <HStack spacing='24px'>
            <WatchlistButton symbol={ticker} />
            <Link
                href={`/stock-details/${ticker}`}
                color={colorScheme}
                fontWeight='bold'
            >
                {ticker}
            </Link>
        </HStack>
    );
};

export default StockSymbol;
