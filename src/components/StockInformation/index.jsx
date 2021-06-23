import React from "react";
import {useStockSymbol} from "../../hooks/useStockInfo";
import {Box, SimpleGrid, Table, Tbody, Td, Tr, useColorModeValue} from "@chakra-ui/react";

const TableData = () => {
    const {stockDetails} = useStockSymbol();
    return (
        <Tbody>
            <Tr>
                <Td>Previous Close</Td>
                <Td>{stockDetails.previous_close}</Td>
            </Tr>
            <Tr>
                <Td>Open</Td>
                <Td>{stockDetails.open}</Td>
            </Tr>
            <Tr>
                <Td>Volume</Td>
                <Td>{stockDetails.avg_vol}</Td>
            </Tr>
        </Tbody>
    )
}

const StockInformation = () => (
    <SimpleGrid columns={{base: 1, md: 3}} spacing={6} bgColor={useColorModeValue("brand.100", "brand.700")} mt={8} borderRadius="lg">
        <Box>
            <Table>
                <TableData/>
            </Table>
        </Box>
        <Box>
            <Table>
                <TableData/>
            </Table>
        </Box>
        <Box>
            <Table>
                <TableData/>
            </Table>
        </Box>
    </SimpleGrid>
)

export default StockInformation;
