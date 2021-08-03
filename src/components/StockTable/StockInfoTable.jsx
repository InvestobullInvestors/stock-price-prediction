import React from "react";
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
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import WatchlistButton from "../WatchlistButton";

const StockSymbol = ({ ticker }) => (
    <Link
        color={useColorModeValue("blue.light", "blue.dark")}
        fontWeight="bold"
    >
        {ticker}
    </Link>
);

const ClickableTd = ({ ticker_id, children, ...otherProps }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/stock-info/${ticker_id}`);
    };

    return (
        <Td onClick={handleClick} isNumeric {...otherProps}>
            {children}
        </Td>
    );
};

const StockInfoTable = ({ stocks, handleSortClick }) => {
    const lightMode = useColorMode().colorMode === "light";

    return (
        <Box
            borderRadius="xl"
            border="2px"
            padding={2}
            borderColor={useColorModeValue("brand.400", "brand.600")}
        >
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th />
                        <Th>Ticker</Th>
                        <Th
                            display={{ base: "none", md: "table-cell" }}
                            onClick={() =>
                                handleSortClick("dividend_payout_ratio")
                            }
                            _hover={{ cursor: "pointer" }}
                        >
                            Dividend Payout Ratio
                        </Th>
                        <Th
                            display={{ base: "none", md: "table-cell" }}
                            onClick={() => handleSortClick("pe_ratio")}
                            _hover={{ cursor: "pointer" }}
                        >
                            PE Ratio
                        </Th>
                        <Th
                            display={{ base: "none", md: "table-cell" }}
                            onClick={() => handleSortClick("peg_ratio")}
                            _hover={{ cursor: "pointer" }}
                        >
                            PEG Ratio
                        </Th>
                        <Th
                            display={{ base: "none", lg: "table-cell" }}
                            onClick={() =>
                                handleSortClick("quarterly_earning_growth")
                            }
                            _hover={{ cursor: "pointer" }}
                        >
                            Quarterly Earning Growth
                        </Th>
                        <Th
                            display={{ base: "none", lg: "table-cell" }}
                            onClick={() =>
                                handleSortClick("quarterly_revenue_growth")
                            }
                            _hover={{ cursor: "pointer" }}
                        >
                            Quarterly Revenue Growth
                        </Th>
                        <Th
                            onClick={() =>
                                handleSortClick("fifty_two_week_low")
                            }
                            _hover={{ cursor: "pointer" }}
                        >
                            52-week Low
                        </Th>
                        <Th
                            onClick={() =>
                                handleSortClick("fifty_two_week_high")
                            }
                            _hover={{ cursor: "pointer" }}
                        >
                            52-week High
                        </Th>
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
                                        ? { cursor: "pointer", bg: "brand.200" }
                                        : { cursor: "pointer", bg: "brand.700" }
                                }
                            >
                                <Td>
                                    <WatchlistButton ticker={ticker_id} />
                                </Td>
                                <ClickableTd
                                    isNumeric="false"
                                    ticker_id={ticker_id}
                                >
                                    <StockSymbol ticker={ticker_id} />
                                </ClickableTd>
                                <ClickableTd
                                    display={{ base: "none", md: "table-cell" }}
                                    ticker_id={ticker_id}
                                >
                                    {dividend_payout_ratio ?? "-"}
                                </ClickableTd>
                                <ClickableTd
                                    display={{ base: "none", md: "table-cell" }}
                                    ticker_id={ticker_id}
                                >
                                    {pe_ratio ?? "-"}
                                </ClickableTd>
                                <ClickableTd
                                    display={{ base: "none", md: "table-cell" }}
                                    ticker_id={ticker_id}
                                >
                                    {peg_ratio ?? "-"}
                                </ClickableTd>
                                <ClickableTd
                                    ticker_id={ticker_id}
                                    display={{ base: "none", lg: "table-cell" }}
                                >
                                    {quarterly_earning_growth ?? "-"}
                                </ClickableTd>
                                <ClickableTd
                                    ticker_id={ticker_id}
                                    display={{ base: "none", lg: "table-cell" }}
                                >
                                    {quarterly_revenue_growth ?? "-"}
                                </ClickableTd>
                                <ClickableTd ticker_id={ticker_id}>
                                    {fifty_two_week_low ?? "-"}
                                </ClickableTd>
                                <ClickableTd ticker_id={ticker_id}>
                                    {fifty_two_week_high ?? "-"}
                                </ClickableTd>
                            </Tr>
                        )
                    )}
                </Tbody>
            </Table>
        </Box>
    );
};

export default StockInfoTable;
