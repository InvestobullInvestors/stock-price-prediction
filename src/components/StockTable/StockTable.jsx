import { useStocks } from '../../hooks/stocks'; // custom hook
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react"

const StockTable = () => {
    const stocks = useStocks();

    const tableData = () => {
        return stocks.map((stock, index) => {
            return (
                <Tr key={stock.symbol}>
                    <Td>{stock.symbol}</Td>
                    <Td>{stock.last_price}</Td>
                    <Td>{stock.change}</Td>
                    <Td>{stock.change_percent}</Td>
                    <Td>{stock.currency}</Td>
                    <Td>{stock.volume}</Td>
                    <Td>{stock.shares_owned}</Td>
                    <Td>{stock.avg_vol}</Td>
                    <Td>{stock.market_cap}</Td>
                </Tr>
            )
        })
    }

    const tableHeader = () => {
        let header = Object.keys(stocks[0])

        return header.map((key, index) => {
            return <Th key={index}>
                {key}
            </Th>
        })
    }

    return (
        <div>
            <Table size="md" variant="striped" colorScheme="cyan">
                <TableCaption placement="top">Stock Table</TableCaption>
                <Thead>
                    <Tr>
                        {tableHeader()}
                    </Tr>
                </Thead>
                <Tbody>
                    {tableData()}
                </Tbody>
            </Table>
        </div>
    )
}

export default StockTable;
