import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Center,
} from '@chakra-ui/react';
import useHandlePayment from '../hooks/useHandlePayment';
import { useUser } from '../contexts/useUser';

const TIMEOUT = 3500;

const stripePublicKey = loadStripe(
    'pk_test_51IweHkKvAxvZ5kVeTShMjLwl1ZyDd6u5GtDEMtnWCKcZq3FNj0L0z7ZLmE5Qk6EVaTds84lMbRTfUPj8Aq0Nodt500I8OLMSs4'
);

const CheckoutForm = ({ payableAmount, closePaymentModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user, upgradeUserPlan } = useUser();

    const handlePayment = useHandlePayment(
        payableAmount,
        stripe,
        elements,
        setIsLoading,
        async (status) => {
            if (status) {
                setPaymentSuccessful(true);
                setAlertVisible(true);
                const {
                    config: { data },
                } = status;
                await upgradeUserPlan(JSON.parse(data));
                setTimeout(() => {
                    setAlertVisible(false);
                    closePaymentModal();
                }, TIMEOUT);
            } else {
                setPaymentSuccessful(false);
                setAlertVisible(true);
            }
        }
    );

    return (
        <>
            {!isLoading && alertVisible && (
                <Alert
                    status={paymentSuccessful ? 'success' : 'error'}
                    flexDirection="column"
                    alignItems="center"
                    py={10}
                    mb={6}
                >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                        {paymentSuccessful
                            ? 'Payment Successful'
                            : 'Payment Failed'}
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                        {paymentSuccessful
                            ? 'Thank you for using InvestoBull!'
                            : 'An error occurred. Please try again.'}
                    </AlertDescription>
                </Alert>
            )}
            {!paymentSuccessful && (
                <>
                    <Box
                        my={2}
                        px={4}
                        py={2}
                        rounded="md"
                        border="solid"
                        borderColor="brand.500"
                        bg="brand.300"
                    >
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#101010',
                                        '::placeholder': {
                                            color: '#696969',
                                        },
                                    },
                                    invalid: {
                                        color: '#DC1212',
                                    },
                                },
                            }}
                        />
                    </Box>
                    <Center>
                        <Button
                            isLoading={isLoading}
                            my={8}
                            colorScheme="brand"
                            onClick={handlePayment}
                            isDisabled={!user}
                            title={user ? '' : 'Log in to subscribe to plan'}
                        >
                            Confirm Payment
                        </Button>
                    </Center>
                </>
            )}
        </>
    );
};

const CreditCardInformation = ({ payableAmount, closePaymentModal }) => {
    return (
        <Elements stripe={stripePublicKey}>
            <CheckoutForm
                payableAmount={payableAmount}
                closePaymentModal={closePaymentModal}
            />
        </Elements>
    );
};

export default CreditCardInformation;
