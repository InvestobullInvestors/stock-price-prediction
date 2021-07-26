import React from "react";
import {Link, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import {Link as ReactRouterLink, useHistory} from "react-router-dom";
import WatchlistButton from "../WatchlistButton";

const StockSymbol = ({ticker}) => (
    <Link as={ReactRouterLink}
          to={`/stock-details/${ticker}`}
          color='blue.dark'
          fontWeight='bold'>{ticker}</Link>
)

const ClickableTd = ({ticker_id, children, ...otherProps}) => {
    const history = useHistory()

    const handleClick = () => {
        history.push(`/stock-info/${ticker_id}`)
    }

    return (
        <Td onClick={handleClick} isNumeric {...otherProps}>
            {children}
        </Td>
    )
}


const StockInfoTable = ({stocks}) => (
    <Table variant="striped"
           border='4px'
           borderColor={useColorModeValue('brand.200', 'brand.600')}
           colorScheme='brand'>
        <Thead>
            <Tr>
                <th/>
                <Th>Ticker Id</Th>
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
            {stocks.map(({
                             ticker_id,
                             dividend_payout_ratio,
                             pe_ratio,
                             peg_ratio,
                             quarterly_earning_growth,
                             quarterly_revenue_growth,
                             fifty_two_week_low,
                             fifty_two_week_high
                         }) =>
                <Tr
                    key={ticker_id}
                    _hover={{cursor: 'pointer'}}
                >
                    <Td>
                        {<WatchlistButton ticker={ticker_id}/>}
                    </Td>
                    <ClickableTd isNumeric='false' ticker_id={ticker_id}>
                        {<StockSymbol ticker={ticker_id}/>}
                    </ClickableTd>
                    <ClickableTd ticker_id={ticker_id}>
                        {dividend_payout_ratio ?? "-"}
                    </ClickableTd>
                    <ClickableTd display={{base: 'none', md: 'table-cell'}} ticker_id={ticker_id}>
                        {pe_ratio ?? "-"}
                    </ClickableTd>
                    <ClickableTd display={{base: 'none', md: 'table-cell'}} ticker_id={ticker_id}>
                        {peg_ratio ?? "-"}
                    </ClickableTd>
                    <ClickableTd ticker_id={ticker_id} display={{base: 'none', lg: 'table-cell'}}>
                        {quarterly_earning_growth ?? "-"}
                    </ClickableTd>
                    <ClickableTd ticker_id={ticker_id} display={{base: 'none', lg: 'table-cell'}}>
                        {quarterly_revenue_growth ?? "-"}
                    </ClickableTd>
                    <ClickableTd ticker_id={ticker_id}>
                        {fifty_two_week_low ?? "-"}
                    </ClickableTd>
                    <ClickableTd ticker_id={ticker_id}>
                        {fifty_two_week_high ?? "-"}
                    </ClickableTd>
                </Tr>
            )}
        </Tbody>
    </Table>
)


export default StockInfoTable;
