import { stockInfo } from '../../shared/stockInfo';
import StockSymbol from '../StockSymbol';

import './styles.css';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useColorModeValue,
    VStack,
    Container,
    Text,
    Code,
} from '@chakra-ui/react';
import React from 'react';
import { useStockSymbolList } from '../../hooks/useStockList';

const StockTable = () => {
    const stocks = stockInfo;
    const { stockDetails } = useStockSymbolList();
    console.log('Stocks Context: ', stockDetails);
    const colorScheme = useColorModeValue('brand.200', 'brand.800');

    // Changes color of text to red or green
    const changeTextColor = (text) => {
        const textStr = text.toString();
        if (textStr.includes('-')) {
            return (
                <Text as='b' color='red'>
                    {textStr}
                </Text>
            );
        } else {
            return (
                <Text as='b' color='green'>
                    {textStr}
                </Text>
            );
        }
    };

    // Displays the details for a stock row
    const TableData = () => {
        return stocks.map((stock, index) => {
            return (
                <Tr key={stock.symbol}>
                    <Td>
                        <StockSymbol ticker={stock.symbol} />
                    </Td>
                    <Td>
                        <Text>{stock.previous_close}</Text>
                    </Td>
                    <Td>
                        <Text>{stock.open}</Text>
                    </Td>
                    <Td>
                        <Text as='b'>{stock.last_price}</Text>
                    </Td>
                    <Td>{changeTextColor(stock.change)}</Td>
                    <Td>{changeTextColor(stock.change_percent)}</Td>
                    <Td>
                        <Text>{stock.currency}</Text>
                    </Td>
                    <Td>
                        <Text>{stock.volume}</Text>
                    </Td>
                    <Td>
                        <Text>{stock.shares_owned}</Text>
                    </Td>
                    <Td>
                        <Text>{stock.avg_vol}</Text>
                    </Td>
                    <Td>
                        <Text>{stock.market_cap}</Text>
                    </Td>
                </Tr>
            );
        });
    };

    return (
        <VStack>
            <Container centerContent>
                <Table
                    size='sm'
                    variant='striped'
                    bg={colorScheme}
                    width='100%'
                    margin='1'
                >
                    <Thead>
                        <Tr>
                            <Th textAlign='right'>Symbol</Th>
                            <Th>Previous Close</Th>
                            <Th>Open</Th>
                            <Th>Last Price</Th>
                            <Th>Change</Th>
                            <Th>Chg %</Th>
                            <Th>Currency</Th>
                            <Th>Volume</Th>
                            <Th>Shares</Th>
                            <Th>Avg Vol</Th>
                            <Th>Market Cap</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <TableData />
                    </Tbody>
                </Table>
            </Container>
        </VStack>
    );
};

export default StockTable;
