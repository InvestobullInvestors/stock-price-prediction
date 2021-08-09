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
    Text,
} from '@chakra-ui/react';
import useHandlePayment from '../hooks/useHandlePayment';
import { useUser } from '../contexts/useUser';

const stripePublicKey = loadStripe(
    'pk_test_51IweHkKvAxvZ5kVeTShMjLwl1ZyDd6u5GtDEMtnWCKcZq3FNj0L0z7ZLmE5Qk6EVaTds84lMbRTfUPj8Aq0Nodt500I8OLMSs4'
);

const CheckoutForm = ({ payableAmount }) => {
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
                        {paymentSuccessful ? (
                            <Text>
                                You are now subscribed to the {user?.plan} plan!
                            </Text>
                        ) : (
                            <Text>An error occurred. Please try again.</Text>
                        )}
                    </AlertDescription>
                </Alert>
            )}
            {!paymentSuccessful && (
                <>
                    {user && user.plan !== 'Basic' && (
                        <Alert status="warning" mb={4}>
                            <AlertIcon />
                            <AlertDescription>
                                <Text>Your current plan is {user.plan}. </Text>
                                <Text>Are you sure you want to pay again?</Text>
                            </AlertDescription>
                        </Alert>
                    )}
                    <Alert status="info" mb={4}>
                        <AlertIcon />
                        <AlertDescription>
                            <Text>
                                To test, use 4242424242424242 (good card), or
                                4000000000009995 (bad card)
                            </Text>
                        </AlertDescription>
                    </Alert>
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

const CreditCardInformation = ({ payableAmount }) => {
    return (
        <Elements stripe={stripePublicKey}>
            <CheckoutForm payableAmount={payableAmount} />
        </Elements>
    );
};

export default CreditCardInformation;
