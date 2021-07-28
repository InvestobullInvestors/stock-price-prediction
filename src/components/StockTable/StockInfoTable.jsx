import React from "react";
import {Link, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";

const StockInfoTable = ({stocks}) => (
    <Table variant="striped"
           border='4px'
           borderColor={useColorModeValue('brand.200', 'brand.600')}
           colorScheme='brand'
    >
        <Thead>
            <Tr>
                <Th>Ticker</Th>
                <Th>Dividend Payout Ratio</Th>
                <Th display={{base: 'none', md: 'table-cell'}}>PE Ratio</Th>
                <Th display={{base: 'none', md: 'table-cell'}}>PEG Ratio</Th>
                <Th display={{base: 'none', lg: 'table-cell'}}>Quarterly Earning Growth</Th>
                <Th display={{base: 'none', lg: 'table-cell'}}>Quarterly Revenue Growth</Th>
                <Th>52-week Low</Th>
                <Th>52-week High</Th>
            </Tr>
        </Thead>
        <Tbody>
            {stocks.map(stockDetails =>
                <Tr key={stockDetails.ticker_id}>
                    <Td><Link as={ReactRouterLink}
                              to={`/stock-details/${stockDetails.ticker_id}`}>{stockDetails.ticker_id}</Link></Td>
                    <Td>{stockDetails.dividend_payout_ratio}</Td>
                    <Td isNumeric display={{base: 'none', md: 'table-cell'}}>{stockDetails.pe_ratio}</Td>
                    <Td isNumeric display={{base: 'none', md: 'table-cell'}}>{stockDetails.peg_ratio}</Td>
                    <Td isNumeric
                        display={{base: 'none', lg: 'table-cell'}}>{stockDetails.quarterly_earning_growth}</Td>
                    <Td isNumeric
                        display={{base: 'none', lg: 'table-cell'}}>{stockDetails.quarterly_revenue_growth}</Td>
                    <Td isNumeric>{stockDetails.fifty_two_week_low}</Td>
                    <Td isNumeric>{stockDetails.fifty_two_week_high}</Td>
                </Tr>
            )}
        </Tbody>
    </Table>
)

export default StockInfoTable;
