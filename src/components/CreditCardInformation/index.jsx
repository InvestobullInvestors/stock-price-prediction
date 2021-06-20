import React from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import {Box, Button, Center} from "@chakra-ui/react";
import axios from "axios";

const stripePublicKey = loadStripe('pk_test_51IweHkKvAxvZ5kVeTShMjLwl1ZyDd6u5GtDEMtnWCKcZq3FNj0L0z7ZLmE5Qk6EVaTds84lMbRTfUPj8Aq0Nodt500I8OLMSs4');

const chargeCard = (paymentId, amount) => {
    axios.post(`http://localhost:3000/charge-card`, JSON.stringify({paymentId: paymentId, amount: amount}))
        .then((response) => {
            console.log(response.data)
        }).catch(err => {
        console.log(err)
    })
}

const CheckoutForm = ({payableAmount}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async (event) => {
        event.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            const {id} = paymentMethod;
            try {
                chargeCard(id, payableAmount);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <Box px={5} py={2} rounded="md" border="solid" borderColor="brand.800" h="10" alignContent="center"
                 bg="brand.100">
                <CardElement/>
            </Box>
            <Center>
                <Button size="sm" my={10} align="center" onClick={handlePayment}>Subscribe Now</Button>
            </Center>
        </>
    )
}


const CreditCardInformation = ({payableAmount}) => {
    return (
        <Elements stripe={stripePublicKey}>
            <CheckoutForm payableAmount={payableAmount}/>
        </Elements>
    )
}

export default CreditCardInformation;
