import {Box, VStack, useColorModeValue, HStack} from "@chakra-ui/react";
import SearchBar from "../SearchBar";
import StockTable from "../StockTable";

const StockTableCard = () => {
    const boxColor = useColorModeValue("brand.100", "brand.700");
    return (
        <Box mx={3} mt={5} px={4} py={10} borderRadius="lg" shadow="md" bg={boxColor}>
            <VStack>
                <HStack>
                    <SearchBar/>
                </HStack>
                <VStack>
                    <StockTable/>
                </VStack>
                <HStack>
                </HStack>
            </VStack>
        </Box>
    )
}

export default StockTableCard;
