import WatchlistButton from '../WatchlistButton';
import { Link, HStack } from '@chakra-ui/react';

const StockSymbol = ({ ticker }) => {
    const loadPage = () => {};

    return (
        <HStack spacing='24px'>
            <WatchlistButton />
            <Link
                href={ticker}
                color='blue'
                fontWeight='bold'
                onClick={loadPage}
            >
                {ticker}
            </Link>
        </HStack>
    );
};

export default StockSymbol;
