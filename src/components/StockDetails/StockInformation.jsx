import React from 'react';
import { useStockSymbol } from '../../contexts/useStockInfo';
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
    useColorModeValue,
} from '@chakra-ui/react';
import LoadingSpinner from '../LoadingSpinner';
import CustomBox from '../CustomBox';
import useCurrencyFormat from '../../hooks/useCurrencyFormat';

const NumberTd = ({ children }) => (
    <Td isNumeric fontWeight="bold">
        {children?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
    </Td>
);

const CurrencyTd = ({ children }) => {
    const formatCurrency = useCurrencyFormat();
    return (
        <Td isNumeric fontWeight="bold">
            {formatCurrency(children)}
        </Td>
    );
};

const QuarterlyStockDataContinued = () => {
    const {
        quarterlyStockDetails: {
            fifty_two_week_high,
            fifty_two_week_low,
            dividend_payout_ratio,
            shares_outstanding,
            shares_float,
            shares_short,
        },
        isQuarterlyDataLoading,
    } = useStockSymbol();

    return (
        <Box>
            {isQuarterlyDataLoading ? (
                <LoadingSpinner />
            ) : (
                <Table>
                    <Tbody>
                        <Tr>
                            <Td>52 Weeks High</Td>
                            <CurrencyTd>{fifty_two_week_high}</CurrencyTd>
                        </Tr>
                        <Tr>
                            <Td>52 Weeks Low</Td>
                            <CurrencyTd>{fifty_two_week_low}</CurrencyTd>
                        </Tr>
                        <Tr>
                            <Td>Dividend Payout Ratio</Td>
                            <NumberTd>{dividend_payout_ratio ?? 0}</NumberTd>
                        </Tr>
                        <Tr>
                            <Td>Shares Outstanding</Td>
                            <NumberTd>{shares_outstanding}</NumberTd>
                        </Tr>
                        <Tr>
                            <Td>Shares Float</Td>
                            <NumberTd>{shares_float}</NumberTd>
                        </Tr>
                        <Tr>
                            <Td>Shares Short</Td>
                            <NumberTd>{shares_short}</NumberTd>
                        </Tr>
                    </Tbody>
                </Table>
            )}
        </Box>
    );
};

const QuarterlyStockData = () => {
    const {
        quarterlyStockDetails: {
            pe_ratio,
            peg_ratio,
            eps,
            quarterly_earning_growth,
            quarterly_revenue_growth,
            beta,
        },
    } = useStockSymbol();

    const { isQuarterlyDataLoading } = useStockSymbol();

    return (
        <Box>
            {isQuarterlyDataLoading ? (
                <LoadingSpinner />
            ) : (
                <Table>
                    <Tbody>
                        <Tr>
                            <Td>PE Ratio</Td>
                            <NumberTd>{pe_ratio}</NumberTd>
                        </Tr>
                        <Tr>
                            <Td>PEG Ratio</Td>
                            <NumberTd>{peg_ratio}</NumberTd>
                        </Tr>
                        <Tr>
                            <Td>EPS</Td>
                            <NumberTd>{eps}</NumberTd>
                        </Tr>
                        <Tr>
                            <Td>Quarterly Earning Growth</Td>
                            <NumberTd>{quarterly_earning_growth}</NumberTd>
                        </Tr>
                        <Tr>
                            <Td>Quarterly Revenue Growth</Td>
                            <NumberTd>{quarterly_revenue_growth}</NumberTd>
                        </Tr>
                        <Tr>
                            <Td>Beta</Td>
                            <NumberTd>{beta}</NumberTd>
                        </Tr>
                    </Tbody>
                </Table>
            )}
        </Box>
    );
};

const LivePrice = () => {
    const {
        realtimeStockDetails: { open, high, low, close, volume },
        quarterlyStockDetails: { currency },
        isRealtimeDataLoading,
        isQuarterlyDataLoading,
        stockName,
    } = useStockSymbol();

    const redColor = useColorModeValue('red.light', 'red.dark');
    const greenColor = useColorModeValue('green.light', 'green.dark');

    return (
        <Box>
            {isRealtimeDataLoading || isQuarterlyDataLoading ? (
                <LoadingSpinner />
            ) : (
                <Table>
                    <Tbody>
                        <Tr>
                            <Td>
                                <StatGroup>
                                    <Stat>
                                        <StatLabel fontSize="xl">
                                            {stockName}
                                        </StatLabel>
                                        <StatNumber
                                            mt={2}
                                            color={
                                                open >= close
                                                    ? greenColor
                                                    : redColor
                                            }
                                        >
                                            {open?.toFixed(2)}
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
                            <CurrencyTd>{close}</CurrencyTd>
                        </Tr>
                        <Tr>
                            <Td>High</Td>
                            <CurrencyTd>{high}</CurrencyTd>
                        </Tr>
                        <Tr>
                            <Td>Low</Td>
                            <CurrencyTd>{low}</CurrencyTd>
                        </Tr>
                        <Tr>
                            <Td>Volume</Td>
                            <NumberTd>{volume}</NumberTd>
                        </Tr>
                    </Tbody>
                </Table>
            )}
        </Box>
    );
};

const StockInformation = ({ ...otherProps }) => (
    <CustomBox {...otherProps}>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
            <LivePrice />
            <QuarterlyStockData />
            <QuarterlyStockDataContinued />
        </SimpleGrid>
    </CustomBox>
);

export default StockInformation;
