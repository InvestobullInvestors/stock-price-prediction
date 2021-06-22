import { useState } from 'react';
import WatchlistButton from '../WatchlistButton';
import { Stack, HStack, VStack, Text } from "@chakra-ui/react"

const StockSymbol = () => {
    const [symbol, setSymbol] = useState("TSLA");

    const loadPage = () => {
        console.log(symbol + " clicked");
    }

    return (
        <HStack spacing="24px">
            <WatchlistButton/>
            <Text color="blue" fontWeight="bold" _hover={{ textDecoration: "underline", cursor: "pointer" }} onClick={loadPage}>{symbol}</Text>
        </HStack>
    )
}

export default StockSymbol;
