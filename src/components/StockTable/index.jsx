import React from 'react';
import StockSymbol from '../StockSymbol';
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
import { useStockList } from '../../contexts/useStockList';

const StockTable = () => {
    const { stocks } = useStockList();

    const bgColor = useColorModeValue('brand.200', 'brand.800');
    const redColor = useColorModeValue('red.light', 'red.dark');
    const greenColor = useColorModeValue('green.light', 'green.dark');

    // Changes color of text to red or green
    const changeTextColor = (text) => {
        const textStr = text.toString();
        if (textStr.includes('-')) {
            return (
                <Text as='b' color={redColor}>
                    {textStr}
                </Text>
            );
        } else {
            return (
                <Text as='b' color={greenColor}>
                    {textStr}
                </Text>
            );
        }
    };

    // Displays the details for a stock row
    const TableData = () => {
        return stocks.map((stock, index) => {
            return (
                <Tr key={index}>
                    <Td>
                        <StockSymbol ticker={stock.ticker} />
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
                    bg={bgColor}
                    width='100%'
                    margin='2'
                    border='4px'
                    borderColor='blackAlpha.100'
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
