import React from "react";
import {HStack, Link, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";
import WatchlistButton from "../WatchlistButton";

const StockSymbol = ({ticker}) => (
    <HStack spacing='24px'>
        <WatchlistButton ticker={ticker}/>
        <Link as={ReactRouterLink}
              to={`/stock-details/${ticker}`}
              color='blue.dark'
              fontWeight='bold'>{ticker}</Link>
    </HStack>
)

const StockInfoTable = ({stocks}) => (
    <Table variant="striped"
           border='4px'
           borderColor={useColorModeValue('brand.200', 'brand.600')}
           colorScheme='brand'
    >
        <Thead>
            <Tr>
                <Th textAlign='right'>Ticker Id</Th>
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
                    <Td>{<StockSymbol ticker={stockDetails.ticker_id}/>}</Td>
                    <Td isNumeric>{stockDetails.dividend_payout_ratio ?? "-"}</Td>
                    <Td isNumeric display={{base: 'none', md: 'table-cell'}}>{stockDetails.pe_ratio ?? "-"}</Td>
                    <Td isNumeric display={{base: 'none', md: 'table-cell'}}>{stockDetails.peg_ratio ?? "-"}</Td>
                    <Td isNumeric
                        display={{base: 'none', lg: 'table-cell'}}>{stockDetails.quarterly_earning_growth ?? "-"}</Td>
                    <Td isNumeric
                        display={{base: 'none', lg: 'table-cell'}}>{stockDetails.quarterly_revenue_growth ?? "-"}</Td>
                    <Td isNumeric>{stockDetails.fifty_two_week_low ?? "-"}</Td>
                    <Td isNumeric>{stockDetails.fifty_two_week_high ?? "-"}</Td>
                </Tr>
            )}
        </Tbody>
    </Table>
)

export default StockInfoTable;
