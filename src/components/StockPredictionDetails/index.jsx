import React from 'react'
import {Box, VStack, Grid, GridItem, Spacer, useColorModeValue, Heading, HStack} from "@chakra-ui/react";

const CustomGridItem = ({children, ...otherProps}) => (
    <GridItem {...otherProps} mx={4} my={4} borderRadius="lg" shadow="md">
        {children}
    </GridItem>
)

const CustomBox = ({children, ...otherProps}) => (
    <Box p={4} w="80%" textAlign="center" bgColor={useColorModeValue("brand.300", "brand.600")} borderRadius="lg" {...otherProps}>
        {children}
    </Box>
)

const PredictionTable = () => (
    <CustomGridItem colSpan={2}>
        <VStack spacing={4}>
            <CustomBox>
                Prediction
            </CustomBox>
            <CustomBox p={4} w="80%" bgColor={useColorModeValue("brand.300", "brand.600")} borderRadius="lg">
                <VStack spacing={4}>
                    <Box p={4} w="100%" bgColor={useColorModeValue("brand.100", "brand.500")} borderRadius="lg">
                        <HStack>
                            <Heading as="h3" size="lg">1 Day</Heading>
                            <Spacer/>
                            <Heading as="h4" size="md" color="lightgreen">612.25</Heading>
                        </HStack>
                    </Box>
                    <Box p={4} w="100%" bgColor={useColorModeValue("brand.100", "brand.500")} borderRadius="lg">
                        <HStack>
                            <Heading as="h3" size="lg">1 Week</Heading>
                            <Spacer/>
                            <Heading as="h4" size="md" color="lightgreen">676.25</Heading>
                        </HStack>
                    </Box>
                </VStack>
            </CustomBox>
        </VStack>
    </CustomGridItem>
)

const PredictionGraph = () => (
    <CustomGridItem colSpan={3} bg="black">
    </CustomGridItem>
)

const StockPredictionDetails = () => (
    <Grid mt={10} templateColumns="repeat(6, 1fr)" borderRadius="lg" gap={2}
          bgColor={useColorModeValue("brand.100", "brand.700")}>
        <PredictionTable/>
        <Spacer/>
        <PredictionGraph/>
    </Grid>
)

export default StockPredictionDetails;
