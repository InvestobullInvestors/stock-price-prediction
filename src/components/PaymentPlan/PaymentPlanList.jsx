import React from 'react';
import { SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import PaymentPlanCard from './PaymentPlanCard';

const PaymentPlanList = () => {
    const bronzeColor = useColorModeValue('bronze.light', 'bronze.dark');
    const silverColor = useColorModeValue('silver.light', 'silver.dark');
    const goldColor = useColorModeValue('gold.light', 'gold.dark');

    return (
        <SimpleGrid columns={{ base: 1, md: 3 }}>
            <PaymentPlanCard
                plan="Basic"
                price={0}
                buttonText="Start Exploring"
                details={[
                    'Access the latest stock data.',
                    'Access the latest stock news.',
                    'Add up to 10 stocks to the watchlist.',
                ]}
                planColor={bronzeColor}
            />
            <PaymentPlanCard
                plan="Premium"
                price={5}
                buttonText="Subscribe Now"
                details={[
                    'All Basic perks.',
                    'Stock price forecast.',
                    'Add unlimited stocks to the watchlist.',
                ]}
                planColor={silverColor}
            />
            <PaymentPlanCard
                plan="Unlimited"
                price={10}
                buttonText="Coming Soon"
                details={[
                    'All Premium perks.',
                    'Change forecast predictors.',
                    'More exciting features to come.',
                ]}
                planColor={goldColor}
            />
        </SimpleGrid>
    );
};

export default PaymentPlanList;
