import React from "react";
import {useStockSymbol} from "../../contexts/useStockInfo";
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
    <Box>
        <Table>
            {children}
        </Table>
    </Box>
)

const HistoricalStockData = () => {
    const {stockDetails} = useStockSymbol();
    return (
        <Tbody>
            <Tr>
                <Td>Previous Close</Td>
                <Td>{stockDetails.previous_close}</Td>
            </Tr>
            <Tr>
                <Td>52 Week Range</Td>
                <Td>{stockDetails.fifty_two_week_low} - {stockDetails.fifty_two_week_high}</Td>
            </Tr>
        </Tbody>
    )
}

const CurrentStockData = () => {
    const {stockDetails} = useStockSymbol()
    return (
        <Tbody>
            <Tr>
                <Td>Open</Td>
                <Td>{stockDetails.open}</Td>
            </Tr>
            <Tr>
                <Td>Market Cap</Td>
                <Td>{stockDetails.market_cap}</Td>
            </Tr>
            <Tr>
                <Td>P/E Ratio</Td>
                <Td>{stockDetails.pe_ratio}</Td>
            </Tr>
            <Tr>
                <Td>Volume</Td>
                <Td>{stockDetails.avg_vol}</Td>
            </Tr>
        </Tbody>
    )
}

const LivePrice = () => {
    const {stockDetails} = useStockSymbol()
    return (
        <Tbody>
            <Tr>
                <Td>
                    <StatGroup>
                        <Stat>
                            <StatLabel fontSize="xl">{stockDetails.company_name}</StatLabel>
                            <StatNumber mt={2}
                                        color={stockDetails.current_price >= stockDetails.previous_close ? "lightgreen" : "red"}>${stockDetails.current_price}
                            </StatNumber>
                            <StatHelpText mt={2}>
                                {stockDetails.currency}
                            </StatHelpText>
                        </Stat>
                    </StatGroup>
                </Td>
            </Tr>
            <Tr>
                <Td>Change</Td>
                <Td>{stockDetails.change}</Td>
            </Tr>
        </Tbody>
    )
}

const StockInformation = () => (
    <SimpleGrid columns={{base: 1, md: 3}} spacing={6} bgColor={useColorModeValue("brand.100", "brand.700")} mt={8}
                borderRadius="lg">
        <StockDataEnclosure>
            <LivePrice/>
        </StockDataEnclosure>
        <StockDataEnclosure>
            <CurrentStockData/>
        </StockDataEnclosure>
        <StockDataEnclosure>
            <HistoricalStockData/>
        </StockDataEnclosure>
    </SimpleGrid>
)

export default StockInformation;
