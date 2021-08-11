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
import useTableHeadingInfo from '../../hooks/useTableHeadingInfo';

const StockSymbol = ({ ticker }) => (
    <Text
        color={useColorModeValue('blue.light', 'blue.dark')}
        fontWeight="bold"
    >
        {ticker}
    </Text>
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

    const mapStringToArrow = {
        dividendPayoutRatio: {
            state: dividendPayoutRatioArrow,
            setState: setDividendPayoutRatioArrow,
        },
        peRatio: { state: peRatioArrow, setState: setPeRatioArrow },
        pegRatio: { state: pegRatioArrow, setState: setPegRatioArrow },
        quarterlyEarningGrowth: {
            state: quarterlyEarningGrowthArrow,
            setState: setQuarterlyEarningGrowthArrow,
        },
        quarterlyRevenueGrowth: {
            state: quarterlyRevenueGrowthArrow,
            setState: setQuarterlyRevenueGrowthArrow,
        },
        fiftyTwoWeekLow: {
            state: fiftyTwoWeekLowArrow,
            setState: setFiftyTwoWeekLowArrow,
        },
        fiftyTwoWeekHigh: {
            state: fiftyTwoWeekHighArrow,
            setState: setFiftyTwoWeekHighArrow,
        },
    };

    const tableHeading = useTableHeadingInfo();

    const changeArrowDirection = (currentState, setter) => {
        setDividendPayoutRatioArrow(0);
        setPeRatioArrow(0);
        setPegRatioArrow(0);
        setQuarterlyEarningGrowthArrow(0);
        setQuarterlyRevenueGrowthArrow(0);
        setFiftyTwoWeekLowArrow(0);
        setFiftyTwoWeekHighArrow(0);
        if (currentState === -1) setter(1);
        else setter(-1);
    };

    const stateToIconMap = {
        '-1': <Icon as={BsChevronUp} boxSize={3} />,
        0: <Icon as={BsChevronExpand} boxSize={4} />,
        1: <Icon as={BsChevronDown} boxSize={3} />,
    };

    return (
        <CustomBox
            padding={2}
            borderColor={useColorModeValue('brand.200', 'brand.700')}
            bg={useColorModeValue('brand.50', 'brand.900')}
        >
            <Table variant="simple">
                <Thead>
                    <Tr>
                        {tableHeading.map((table_details) => (
                            <Th
                                w={table_details?.width ?? '12%'}
                                display={table_details?.display}
                                _hover={
                                    table_details?.hover ?? {
                                        cursor: 'pointer',
                                        color: color,
                                    }
                                }
                                onClick={() => {
                                    handleSortClick(
                                        table_details.column_name,
                                        mapStringToArrow[table_details.id].state
                                    );
                                    changeArrowDirection(
                                        mapStringToArrow[table_details.id]
                                            .state,
                                        mapStringToArrow[table_details.id]
                                            .setState
                                    );
                                }}
                            >
                                <HStack>
                                    <Text>{table_details.name}</Text>
                                    {table_details.id
                                        ? stateToIconMap[
                                              mapStringToArrow[table_details.id]
                                                  .state
                                          ]
                                        : null}
                                </HStack>
                            </Th>
                        ))}
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
