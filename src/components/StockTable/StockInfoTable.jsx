import React, { useState } from 'react';
import {
    HStack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import WatchlistButton from '../WatchlistButton';
import CustomBox from '../CustomBox';
import { Icon } from '@chakra-ui/icons';
import { BsChevronDown, BsChevronExpand, BsChevronUp } from 'react-icons/bs';
import useCurrencyFormat from '../../hooks/useCurrencyFormat';

const StockSymbol = ({ ticker }) => (
    <Text
        color={useColorModeValue('blue.light', 'blue.dark')}
        fontWeight="bold"
    >
        {ticker}
    </Text>
);

const CustomTh = ({ children, ...otherProps }) => (
    <Th
        w="12%"
        _hover={{
            cursor: 'pointer',
            color: useColorModeValue('brand.500', 'brand.400'),
        }}
        {...otherProps}
    >
        {children}
    </Th>
);

const ClickableTd = ({ ticker_id, children, ...otherProps }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/stock-info/${ticker_id}`);
    };

    return (
        <Td w="12%" onClick={handleClick} isNumeric {...otherProps}>
            {children}
        </Td>
    );
};

const StockInfoTable = ({ stocks, handleSortClick }) => {
    const formatCurrency = useCurrencyFormat();
    const isLightMode = useColorMode().colorMode === 'light';
    const greenColor = useColorModeValue('green.light', 'green.dark');
    const redColor = useColorModeValue('red.light', 'red.dark');

    const [dividendPayoutRatioArrow, setDividendPayoutRatioArrow] = useState(0);
    const [peRatioArrow, setPeRatioArrow] = useState(0);
    const [pegRatioArrow, setPegRatioArrow] = useState(0);
    const [quarterlyEarningGrowthArrow, setQuarterlyEarningGrowthArrow] =
        useState(0);
    const [quarterlyRevenueGrowthArrow, setQuarterlyRevenueGrowthArrow] =
        useState(0);
    const [fiftyTwoWeekLowArrow, setFiftyTwoWeekLowArrow] = useState(0);
    const [fiftyTwoWeekHighArrow, setFiftyTwoWeekHighArrow] = useState(0);

    const changeArrowDirection = (state, setter) => {
        const currentState = state;
        // reset all arrow states
        setDividendPayoutRatioArrow(0);
        setPeRatioArrow(0);
        setPegRatioArrow(0);
        setQuarterlyEarningGrowthArrow(0);
        setQuarterlyRevenueGrowthArrow(0);
        setFiftyTwoWeekLowArrow(0);
        setFiftyTwoWeekHighArrow(0);
        // change arrow direction
        if (currentState === -1) setter(1);
        else setter(-1);
    };

    const displayArrow = (state) => {
        if (state === -1) return <Icon as={BsChevronUp} boxSize={3} />;
        if (state === 0) return <Icon as={BsChevronExpand} boxSize={4} />;
        if (state === 1) return <Icon as={BsChevronDown} boxSize={3} />;
    };

    return (
        <CustomBox
            padding={0}
            borderColor={useColorModeValue('brand.200', 'brand.700')}
            bg={useColorModeValue('brand.50', 'brand.900')}
        >
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <CustomTh w="4%" _hover={{ cursor: 'default' }} />
                        <CustomTh _hover={{ cursor: 'default' }}>
                            Ticker
                        </CustomTh>
                        <CustomTh
                            display={{ base: 'none', md: 'table-cell' }}
                            onClick={() => {
                                handleSortClick(
                                    'dividend_payout_ratio',
                                    dividendPayoutRatioArrow
                                );
                                changeArrowDirection(
                                    dividendPayoutRatioArrow,
                                    setDividendPayoutRatioArrow
                                );
                            }}
                        >
                            <HStack>
                                <Text>Dividend Payout Ratio</Text>
                                {displayArrow(dividendPayoutRatioArrow)}
                            </HStack>
                        </CustomTh>
                        <CustomTh
                            display={{ base: 'none', md: 'table-cell' }}
                            onClick={() => {
                                handleSortClick('pe_ratio', peRatioArrow);
                                changeArrowDirection(
                                    peRatioArrow,
                                    setPeRatioArrow
                                );
                            }}
                        >
                            <HStack>
                                <Text>PE Ratio</Text>
                                {displayArrow(peRatioArrow)}
                            </HStack>
                        </CustomTh>
                        <CustomTh
                            display={{ base: 'none', md: 'table-cell' }}
                            onClick={() => {
                                handleSortClick('peg_ratio', pegRatioArrow);
                                changeArrowDirection(
                                    pegRatioArrow,
                                    setPegRatioArrow
                                );
                            }}
                        >
                            <HStack>
                                <Text>PEG Ratio</Text>
                                {displayArrow(pegRatioArrow)}
                            </HStack>
                        </CustomTh>
                        <CustomTh
                            display={{ base: 'none', lg: 'table-cell' }}
                            onClick={() => {
                                handleSortClick(
                                    'quarterly_earning_growth',
                                    quarterlyEarningGrowthArrow
                                );
                                changeArrowDirection(
                                    quarterlyEarningGrowthArrow,
                                    setQuarterlyEarningGrowthArrow
                                );
                            }}
                        >
                            <HStack>
                                <Text>Quarterly Earning Growth</Text>
                                {displayArrow(quarterlyEarningGrowthArrow)}
                            </HStack>
                        </CustomTh>
                        <CustomTh
                            display={{ base: 'none', lg: 'table-cell' }}
                            onClick={() => {
                                handleSortClick(
                                    'quarterly_revenue_growth',
                                    quarterlyRevenueGrowthArrow
                                );
                                changeArrowDirection(
                                    quarterlyRevenueGrowthArrow,
                                    setQuarterlyRevenueGrowthArrow
                                );
                            }}
                        >
                            <HStack>
                                <Text>Quarterly Revenue Growth</Text>
                                {displayArrow(quarterlyRevenueGrowthArrow)}
                            </HStack>
                        </CustomTh>
                        <CustomTh
                            onClick={() => {
                                handleSortClick(
                                    'fifty_two_week_low',
                                    fiftyTwoWeekLowArrow
                                );
                                changeArrowDirection(
                                    fiftyTwoWeekLowArrow,
                                    setFiftyTwoWeekLowArrow
                                );
                            }}
                        >
                            <HStack>
                                <Text>52-week Low</Text>
                                {displayArrow(fiftyTwoWeekLowArrow)}
                            </HStack>
                        </CustomTh>
                        <CustomTh
                            onClick={() => {
                                handleSortClick(
                                    'fifty_two_week_high',
                                    fiftyTwoWeekHighArrow
                                );
                                changeArrowDirection(
                                    fiftyTwoWeekHighArrow,
                                    setFiftyTwoWeekHighArrow
                                );
                            }}
                        >
                            <HStack>
                                <Text>52-week High</Text>
                                {displayArrow(fiftyTwoWeekHighArrow)}
                            </HStack>
                        </CustomTh>
                    </Tr>
                </Thead>
                <Tbody>
                    {stocks.map(
                        ({
                            ticker_id,
                            dividend_payout_ratio,
                            pe_ratio,
                            peg_ratio,
                            quarterly_earning_growth,
                            quarterly_revenue_growth,
                            fifty_two_week_low,
                            fifty_two_week_high,
                        }) => (
                            <Tr
                                key={ticker_id}
                                _hover={
                                    isLightMode
                                        ? {
                                              cursor: 'pointer',
                                              bg: 'brand.100',
                                          }
                                        : {
                                              cursor: 'pointer',
                                              bg: 'brand.800',
                                          }
                                }
                            >
                                <Td w="4%">
                                    <WatchlistButton ticker={ticker_id} />
                                </Td>
                                <ClickableTd
                                    isNumeric="false"
                                    ticker_id={ticker_id}
                                >
                                    <StockSymbol ticker={ticker_id} />
                                </ClickableTd>
                                <ClickableTd
                                    display={{
                                        base: 'none',
                                        md: 'table-cell',
                                    }}
                                    ticker_id={ticker_id}
                                >
                                    {dividend_payout_ratio ?? '-'}
                                </ClickableTd>
                                <ClickableTd
                                    display={{
                                        base: 'none',
                                        md: 'table-cell',
                                    }}
                                    ticker_id={ticker_id}
                                >
                                    {pe_ratio ?? '-'}
                                </ClickableTd>
                                <ClickableTd
                                    display={{
                                        base: 'none',
                                        md: 'table-cell',
                                    }}
                                    ticker_id={ticker_id}
                                >
                                    {peg_ratio ?? '-'}
                                </ClickableTd>
                                <ClickableTd
                                    ticker_id={ticker_id}
                                    display={{
                                        base: 'none',
                                        lg: 'table-cell',
                                    }}
                                    color={
                                        quarterly_earning_growth >= 0
                                            ? greenColor
                                            : redColor
                                    }
                                >
                                    {quarterly_earning_growth ?? '-'}
                                </ClickableTd>
                                <ClickableTd
                                    ticker_id={ticker_id}
                                    display={{
                                        base: 'none',
                                        lg: 'table-cell',
                                    }}
                                    color={
                                        quarterly_revenue_growth >= 0
                                            ? greenColor
                                            : redColor
                                    }
                                >
                                    {quarterly_revenue_growth ?? '-'}
                                </ClickableTd>
                                <ClickableTd ticker_id={ticker_id}>
                                    {fifty_two_week_low
                                        ? formatCurrency(fifty_two_week_low)
                                        : '-'}
                                </ClickableTd>
                                <ClickableTd ticker_id={ticker_id}>
                                    {fifty_two_week_high
                                        ? formatCurrency(fifty_two_week_high)
                                        : '-'}
                                </ClickableTd>
                            </Tr>
                        )
                    )}
                </Tbody>
            </Table>
        </CustomBox>
    );
};

export default StockInfoTable;
