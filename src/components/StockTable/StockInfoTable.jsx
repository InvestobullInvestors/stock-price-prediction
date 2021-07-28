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


const StockInfoTable = ({stocks}) => {
    const lightMode = useColorMode().colorMode === "light"

    return <Box borderRadius="lg" shadow="md" border='2px' borderColor={useColorModeValue('brand.200', 'brand.600')}>
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th/>
                    <Th>Ticker Id</Th>
                    <Th display={{base: 'none', sm: 'table-cell'}}>Dividend Payout Ratio</Th>
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
                    <Tr key={ticker_id}
                        _hover={lightMode ? {cursor: 'pointer', bg: 'brand.200'} : {cursor: 'pointer', bg: 'brand.700'}}
                    >
                        <Td>
                            {<WatchlistButton ticker={ticker_id}/>}
                        </Td>
                        <ClickableTd isNumeric='false' ticker_id={ticker_id}>
                            {<StockSymbol ticker={ticker_id}/>}
                        </ClickableTd>
                        <ClickableTd display={{base: 'none', sm: 'table-cell'}} ticker_id={ticker_id}>
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
    </Box>
}


export default StockInfoTable;
