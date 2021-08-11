import React from 'react';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Center,
    Grid,
    GridItem,
    Heading,
    HStack,
    SimpleGrid,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { usePrediction } from '../../contexts/usePredictions';
import PredictionSlider from './PredictionSlider';
import CustomBox from '../CustomBox';
import useDateFormat from '../../hooks/useDateFormat';
import LoadingSpinner from '../LoadingSpinner';

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

const PricePrediction = () => {
    const {
        predictedValue: { prediction_details },
        isPredictionLoading,
    } = usePrediction();

    const formatDate = useDateFormat();
    const redColor = useColorModeValue('red.light', 'red.dark');
    const greenColor = useColorModeValue('green.light', 'green.dark');

    return (
        <CustomGridItem>
            {isPredictionLoading ? (
                <LoadingSpinner />
            ) : (
                <VStack spacing={4}>
                    <Heading as="h3" size="lg" p={8} textAlign="center">
                        Prediction
                    </Heading>
                    <Box p={4} w="80%">
                        <VStack spacing={4}>
                            {prediction_details
                                ? prediction_details.map(
                                      ({ close, timestamp, _id }) => (
                                          <Box key={_id} p={4} w="100%">
                                              <SimpleGrid
                                                  columns={{ base: 1, lg: 2 }}
                                                  spacing={1}
                                              >
                                                  <Center>
                                                      <Heading
                                                          as="h4"
                                                          size="md"
                                                      >
                                                          {formatDate(
                                                              timestamp
                                                          )}
                                                      </Heading>
                                                  </Center>
                                                  <Heading
                                                      as="h3"
                                                      size="lg"
                                                      color={
                                                          close >= 0
                                                              ? greenColor
                                                              : redColor
                                                      }
                                                  >
                                                      $
                                                      {close?.toFixed(2) ??
                                                          ' --.--'}
                                                  </Heading>
                                              </SimpleGrid>
                                          </Box>
                                      )
                                  )
                                : null}
                        </VStack>
                    </Box>
                </VStack>
            )}
        </CustomGridItem>
    );
};

const SlidablePredictions = () => {
    const { predictedValue } = usePrediction();
    const { inflation, revenueGrowth, eps, marketCap } = predictedValue;
    return (
        <CustomGridItem>
            <Alert status="info">
                <AlertIcon />
                <AlertDescription>Coming Soon</AlertDescription>
            </Alert>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                <PredictionSlider
                    predictedValue={inflation}
                    tag="Inflation (%)"
                />
                <PredictionSlider
                    predictedValue={revenueGrowth}
                    tag="Revenue Growth"
                />
                <PredictionSlider predictedValue={eps} tag="EPS" />
                <PredictionSlider
                    predictedValue={marketCap}
                    tag="Market Cap (in million)"
                />
            </SimpleGrid>
        </CustomGridItem>
    );
};

const StockPredictionDetails = ({ ...otherProps }) => (
    <CustomBox {...otherProps}>
        <Grid
            templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' }}
            gap={2}
        >
            <PricePrediction />
            <SlidablePredictions />
        </Grid>
    </CustomBox>
);

export default StockPredictionDetails;
