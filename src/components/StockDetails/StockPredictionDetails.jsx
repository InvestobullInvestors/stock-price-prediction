import React from 'react';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Grid,
    GridItem,
    Heading,
    SimpleGrid,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { usePrediction } from '../../contexts/usePredictions';
import PredictionSlider from './PredictionSlider';
import CustomBox from '../CustomBox';
import useDateFormat from '../../hooks/useDateFormat';
import LoadingSpinner from '../LoadingSpinner';
import { useStockSymbol } from '../../contexts/useStockInfo';

const CustomGridItem = ({ children, ...otherProps }) => (
    <GridItem m={4} colSpan={3} {...otherProps}>
        {children}
    </GridItem>
);

const PricePrediction = () => {
    const {
        predictedValue: { prediction_details },
        isPredictionLoading,
    } = usePrediction();

    const {
        realtimeStockDetails: { close },
        isRealtimeDataLoading,
    } = useStockSymbol();

    const formatDate = useDateFormat();
    const redColor = useColorModeValue('red.light', 'red.dark');
    const greenColor = useColorModeValue('green.light', 'green.dark');

    return (
        <CustomGridItem>
            {isPredictionLoading || isRealtimeDataLoading ? (
                <LoadingSpinner />
            ) : (
                <VStack spacing={4}>
                    <Heading as="h3" size="lg" p={8} textAlign="center">
                        Prediction of Closing Prices
                    </Heading>
                    <VStack spacing={6}>
                        {prediction_details
                            ? prediction_details.map(({ Close, Date, _id }) => (
                                  <SimpleGrid
                                      key={_id}
                                      columns={2}
                                      spacing={4}
                                      justifyItems="center"
                                      alignItems="center"
                                  >
                                      <Heading as="h4" size="md">
                                          {formatDate(Date)}
                                      </Heading>
                                      <Heading
                                          as="h3"
                                          size="lg"
                                          color={
                                              Close >= close
                                                  ? greenColor
                                                  : redColor
                                          }
                                      >
                                          ${Close?.toFixed(2) ?? ' --.--'}
                                      </Heading>
                                  </SimpleGrid>
                              ))
                            : null}
                    </VStack>
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
