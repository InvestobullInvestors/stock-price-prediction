import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import PaymentPlanCard from "./PaymentPlanCard";

const PaymentPlanList = () => (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        <PaymentPlanCard
            type="Basic"
            price={0}
            buttonText="Start Exploring"
            details={[
                "Access to the latest stock data",
                "Access to the latest stock news",
                "Add 5 stocks to the watchlist",
            ]}
        />
        <PaymentPlanCard
            type="Premium"
            price={5}
            buttonText="Subscribe Now"
            details={[
                "All perks from the basic plan",
                "Stock price forecast",
                "Add 20 stocks to the watchlist",
            ]}
        />
        <PaymentPlanCard
            type="Unlimited"
            price={10}
            buttonText="Subscribe Now"
            details={[
                "All perks from the premium plan",
                "Change forecast predictors",
                "Add unlimited stocks to the watchlist",
            ]}
        />
    </SimpleGrid>
);

export default PaymentPlanList;
