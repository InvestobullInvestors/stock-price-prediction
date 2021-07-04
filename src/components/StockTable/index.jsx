import { stockInfo } from '../../shared/stockInfo';
import StockSymbol from '../StockSymbol';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useTable, useSortBy } from 'react-table';

const StockTable = () => {
    const stocks = stockInfo;
    const color = useColorModeValue('facebook', 'blackAlpha');

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
        <div>
            <Table size='sm' variant='striped' colorScheme={color}>
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
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
        </div>
    );
};

export default StockTable;
