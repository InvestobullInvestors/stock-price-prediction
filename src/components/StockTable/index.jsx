import { stockInfo } from '../../shared/stockInfo';
import StockSymbol from '../StockSymbol';
import { useStockSymbol } from '../../contexts/useStockInfo';
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
} from '@chakra-ui/react';
import React from 'react';

const StockTable = () => {
    const stocks = stockInfo;

    const { stocksDe } = useStockSymbol();
    console.log('STOCKS', stocksDe);
    //const {stockDetails} = useStockSymbol();
    const colorScheme = useColorModeValue('brand.200', 'brand.800');

    // Displays the details for a stock row
    const TableData = () => {
        return stocks.map((stock, index) => {
            return (
                <Tr key={stock.symbol}>
                    <Td>
                        <StockSymbol ticker={stock.symbol} />
                    </Td>
                    <Td>{stock.previous_close}</Td>
                    <Td>{stock.open}</Td>
                    <Td>{stock.last_price}</Td>
                    <Td>{stock.change}</Td>
                    <Td>{stock.change_percent}</Td>
                    <Td>{stock.currency}</Td>
                    <Td>{stock.volume}</Td>
                    <Td>{stock.shares_owned}</Td>
                    <Td>{stock.avg_vol}</Td>
                    <Td>{stock.market_cap}</Td>
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
                    width='30%'
                    margin='1'
                >
                    <Thead>
                        <Tr>
                            <Th></Th>
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
