import WatchlistButton from '../WatchlistButton';
import { Link, HStack, useColorModeValue } from '@chakra-ui/react';

const StockSymbol = ({ ticker }) => {
    const color = useColorModeValue('blue', 'blue.400');

    const loadPage = () => {};

    return (
        <HStack spacing='24px'>
            <WatchlistButton />
            <Link
                href={ticker}
                color={color}
                fontWeight='bold'
                onClick={loadPage}
            >
                {ticker}
            </Link>
        </HStack>
    );
};

export default StockSymbol;
