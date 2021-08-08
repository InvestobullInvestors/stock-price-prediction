import React from 'react';
import {
    Box,
    Link,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import WatchlistButton from '../WatchlistButton';
import CustomBox from '../CustomBox';

const StockSymbol = ({ ticker }) => (
    <Link
        color={useColorModeValue('blue.light', 'blue.dark')}
        fontWeight="bold"
    >
        {ticker}
    </Link>
);

const CustomTh = ({ children, ...otherProps }) => (
    <Th w="12%" {...otherProps}>
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
    const lightMode = useColorMode().colorMode === 'light';
    const greenColor = useColorModeValue('green.light', 'green.dark');
    const redColor = useColorModeValue('red.light', 'red.dark');

    return (
        <CustomBox
            padding={2}
            borderColor={useColorModeValue('brand.200', 'brand.700')}
            bg={useColorModeValue('brand.50', 'brand.900')}
        >
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <CustomTh w="4%" />
                        <CustomTh>Ticker</CustomTh>
                        <CustomTh
                            display={{ base: 'none', md: 'table-cell' }}
                            onClick={() =>
                                handleSortClick('dividend_payout_ratio')
                            }
                            _hover={{ cursor: 'pointer' }}
                        >
                            Dividend Payout Ratio
                        </CustomTh>
                        <CustomTh
                            display={{ base: 'none', md: 'table-cell' }}
                            onClick={() => handleSortClick('pe_ratio')}
                            _hover={{ cursor: 'pointer' }}
                        >
                            PE Ratio
                        </CustomTh>
                        <CustomTh
                            display={{ base: 'none', md: 'table-cell' }}
                            onClick={() => handleSortClick('peg_ratio')}
                            _hover={{ cursor: 'pointer' }}
                        >
                            PEG Ratio
                        </CustomTh>
                        <CustomTh
                            display={{ base: 'none', lg: 'table-cell' }}
                            onClick={() =>
                                handleSortClick('quarterly_earning_growth')
                            }
                            _hover={{ cursor: 'pointer' }}
                        >
                            Quarterly Earning Growth
                        </CustomTh>
                        <CustomTh
                            display={{ base: 'none', lg: 'table-cell' }}
                            onClick={() =>
                                handleSortClick('quarterly_revenue_growth')
                            }
                            _hover={{ cursor: 'pointer' }}
                        >
                            Quarterly Revenue Growth
                        </CustomTh>
                        <CustomTh
                            onClick={() =>
                                handleSortClick('fifty_two_week_low')
                            }
                            _hover={{ cursor: 'pointer' }}
                        >
                            52-week Low
                        </CustomTh>
                        <CustomTh
                            onClick={() =>
                                handleSortClick('fifty_two_week_high')
                            }
                            _hover={{ cursor: 'pointer' }}
                        >
                            52-week High
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
                                    lightMode
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
                                    {fifty_two_week_low?.toFixed(2) ?? '-'}
                                </ClickableTd>
                                <ClickableTd ticker_id={ticker_id}>
                                    {fifty_two_week_high?.toFixed(2) ?? '-'}
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
