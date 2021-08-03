import React from "react";
import {
    Box,
    Grid,
    GridItem,
    Heading,
    SimpleGrid,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { usePrediction } from "../../contexts/usePredictions";
import PredictionSlider from "./PredictionSlider";

const CustomGridItem = ({ children, ...otherProps }) => (
    <GridItem
        mx={4}
        my={4}
        borderRadius="lg"
        shadow="none"
        colSpan={3}
        {...otherProps}
    >
        {children}
    </GridItem>
);

const CustomContainer = ({ children, ...otherProps }) => (
    <Box
        p={4}
        w="80%"
        textAlign="center"
        bgColor={useColorModeValue("brand.300", "brand.600")}
        borderRadius="lg"
        {...otherProps}
    >
        {children}
    </Box>
);

const PricePrediction = () => (
    <CustomGridItem>
        <VStack spacing={4}>
            <CustomContainer>Prediction</CustomContainer>
            <CustomContainer
                p={4}
                w="80%"
                bgColor={useColorModeValue("brand.300", "brand.600")}
                borderRadius="lg"
            >
                <VStack spacing={4}>
                    <Box
                        p={4}
                        w="100%"
                        bgColor={useColorModeValue("brand.100", "brand.500")}
                        borderRadius="lg"
                    >
                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={1}>
                            <Heading as="h3" size="lg">
                                1 Day
                            </Heading>
                            <Heading as="h3" size="lg" color="lightgreen">
                                612.25
                            </Heading>
                        </SimpleGrid>
                    </Box>
                    <Box
                        p={4}
                        w="100%"
                        bgColor={useColorModeValue("brand.100", "brand.500")}
                        borderRadius="lg"
                    >
                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={1}>
                            <Heading as="h3" size="lg">
                                1 Week
                            </Heading>
                            <Heading as="h3" size="lg" color="lightgreen">
                                676.25
                            </Heading>
                        </SimpleGrid>
                    </Box>
                    <Box
                        p={4}
                        w="100%"
                        bgColor={useColorModeValue("brand.100", "brand.500")}
                        borderRadius="lg"
                    >
                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={1}>
                            <Heading as="h3" size="lg">
                                1 Month
                            </Heading>
                            <Heading as="h3" size="lg" color="lightgreen">
                                690.25
                            </Heading>
                        </SimpleGrid>
                    </Box>
                    <Box
                        p={4}
                        w="100%"
                        bgColor={useColorModeValue("brand.100", "brand.500")}
                        borderRadius="lg"
                    >
                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={1}>
                            <Heading as="h3" size="lg">
                                1 Year
                            </Heading>
                            <Heading as="h3" size="lg" color="lightgreen">
                                700.25
                            </Heading>
                        </SimpleGrid>
                    </Box>
                </VStack>
            </CustomContainer>
        </VStack>
    </CustomGridItem>
);

const SlidablePredictions = () => {
    const { predictedValue } = usePrediction();
    const { inflation, revenueGrowth, eps, marketCap } = predictedValue;
    return (
        <CustomGridItem>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                <PredictionSlider value={inflation} tag="Inflation" />
                <PredictionSlider value={revenueGrowth} tag="Revenue Growth" />
                <PredictionSlider value={eps} tag="EPS" />
                <PredictionSlider
                    value={marketCap}
                    tag="Market Cap (in million)"
                />
            </SimpleGrid>
        </CustomGridItem>
    );
};

const StockPredictionDetails = () => (
    <Grid
        mt={10}
        templateColumns={{ base: "repeat(3, 1fr)", lg: "repeat(6, 1fr)" }}
        borderRadius="lg"
        gap={2}
        bgColor={useColorModeValue("brand.100", "brand.700")}
    >
        <PricePrediction />
        <SlidablePredictions />
    </Grid>
);

export default StockPredictionDetails;
