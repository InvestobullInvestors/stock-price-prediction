import React from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {
    Elements,
    CardElement
} from "@stripe/react-stripe-js";
import {Button, Center, Box} from "@chakra-ui/react";

const stripePublicKey = loadStripe('pk_test_51IweHkKvAxvZ5kVeTShMjLwl1ZyDd6u5GtDEMtnWCKcZq3FNj0L0z7ZLmE5Qk6EVaTds84lMbRTfUPj8Aq0Nodt500I8OLMSs4');

const CreditCardInformation = () => (
    <Elements stripe={stripePublicKey}>
        <Box px={5} py={2} rounded="md" border="solid" borderColor="brand.800" h="10" alignContent="center">
            <CardElement
            />
        </Box>
        <Center>
            <Button size="sm" my={10} align="center">Subscribe Now</Button>
        </Center>
    </Elements>
)

export default CreditCardInformation;
