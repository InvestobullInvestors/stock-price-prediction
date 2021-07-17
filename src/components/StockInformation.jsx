import React from "react";
import {useStockSymbol} from "../contexts/useStockInfo";
import {
    Box,
    SimpleGrid,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
    Table,
    Tbody,
    Td,
    Tr,
    useColorModeValue
} from "@chakra-ui/react";

const StockDataEnclosure = ({children}) => (
    <Box mx={4}>
        <Table>
            {children}
        </Table>
    </Box>
)

const LabelTd = ({children}) => (
    <Td isNumeric fontWeight="bold">{children}</Td>
)

const formatNumber = num => (
    num?.toLocaleString('en-US', {maximumFractionDigits: 2})
)

const QuarterlyStockDataContinued = () => {
    const {
        quarterlyStockDetails: {
            fifty_two_week_high,
            fifty_two_week_low,
            dividend_payout_ratio,
            shares_outstanding,
            shares_float,
            shares_short
        }
    } = useStockSymbol()

    return (
        <Tbody>
            <Tr>
                <Td>52 Weeks High</Td>
                <LabelTd>{formatNumber(fifty_two_week_high)}</LabelTd>
            </Tr>
            <Tr>
                <Td>52 Weeks Low</Td>
                <LabelTd>{formatNumber(fifty_two_week_low)}</LabelTd>
            </Tr>
            <Tr>
                <Td>Dividend Payout Ratio</Td>
                <LabelTd>{formatNumber(dividend_payout_ratio) ?? 0}</LabelTd>
            </Tr>
            <Tr>
                <Td>Shares Outstanding</Td>
                <LabelTd>{formatNumber(shares_outstanding)}</LabelTd>
            </Tr>
            <Tr>
                <Td>Shares Float</Td>
                <LabelTd>{formatNumber(shares_float)}</LabelTd>
            </Tr>
            <Tr>
                <Td>Shares Short</Td>
                <LabelTd>{formatNumber(shares_short)}</LabelTd>
            </Tr>
        </Tbody>
    )
}

const QuarterlyStockData = () => {
    const {
        quarterlyStockDetails: {
            pe_ratio,
            peg_ratio,
            eps,
            quarterly_earning_growth,
            quarterly_revenue_growth,
            beta
        }
    } = useStockSymbol()

    return (
        <Tbody>
            <Tr>
                <Td>PE Ratio</Td>
                <LabelTd>{formatNumber(pe_ratio)}</LabelTd>
            </Tr>
            <Tr>
                <Td>PEG Ratio</Td>
                <LabelTd>{formatNumber(peg_ratio)}</LabelTd>
            </Tr>
            <Tr>
                <Td>EPS</Td>
                <LabelTd>{formatNumber(eps)}</LabelTd>
            </Tr>
            <Tr>
                <Td>Quarterly Earning Growth</Td>
                <LabelTd>{formatNumber(quarterly_earning_growth)}</LabelTd>
            </Tr>
            <Tr>
                <Td>Quarterly Revenue Growth</Td>
                <LabelTd>{formatNumber(quarterly_revenue_growth)}</LabelTd>
            </Tr>
            <Tr>
                <Td>Beta</Td>
                <LabelTd>{formatNumber(beta)}</LabelTd>
            </Tr>
        </Tbody>
    )
}

const LivePrice = () => {
    const {stockName} = useStockSymbol()
    const {realtimeStockDetails: {open, high, low, close, volume}} = useStockSymbol()
    const {quarterlyStockDetails: {currency}} = useStockSymbol()
    const redColor = useColorModeValue('red.light', 'red.dark');
    const greenColor = useColorModeValue('green.light', 'green.dark');

    return (
        <Tbody>
            <Tr>
                <Td>
                    <StatGroup>
                        <Stat>
                            <StatLabel fontSize="xl">{stockName}</StatLabel>
                            <StatNumber mt={2} color={open >= close ? greenColor : redColor}>
                                {formatNumber(open)}
                            </StatNumber>
                            <StatHelpText mt={2}>
                                {currency}
                            </StatHelpText>
                        </Stat>
                    </StatGroup>
                </Td>
            </Tr>
            <Tr>
                <Td>Close</Td>
                <LabelTd>{formatNumber(close)}</LabelTd>
            </Tr>
            <Tr>
                <Td>High</Td>
                <LabelTd>{formatNumber(high)}</LabelTd>
            </Tr>
            <Tr>
                <Td>Low</Td>
                <LabelTd>{formatNumber(low)}</LabelTd>
            </Tr>
            <Tr>
                <Td>Volume</Td>
                <LabelTd>{formatNumber(volume)}</LabelTd>
            </Tr>
        </Tbody>
    )
}

const StockInformation = () => (
    <SimpleGrid columns={{base: 1, lg: 3}} spacing={8} bgColor={useColorModeValue("brand.100", "brand.700")}
                mt={8} p={4} borderRadius="lg">
        <StockDataEnclosure>
            <LivePrice/>
        </StockDataEnclosure>
        <StockDataEnclosure>
            <QuarterlyStockData/>
        </StockDataEnclosure>
        <StockDataEnclosure>
            <QuarterlyStockDataContinued/>
        </StockDataEnclosure>
    </SimpleGrid>
)

export default StockInformation;
