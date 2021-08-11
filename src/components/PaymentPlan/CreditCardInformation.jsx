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
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import useHandlePayment from '../../hooks/useHandlePayment';
import { useUser } from '../../contexts/useUser';

const stripePublicKey = loadStripe(
    'pk_test_51IweHkKvAxvZ5kVeTShMjLwl1ZyDd6u5GtDEMtnWCKcZq3FNj0L0z7ZLmE5Qk6EVaTds84lMbRTfUPj8Aq0Nodt500I8OLMSs4'
);

const CreditCardInputBox = () => (
    <Box
        my={4}
        p={4}
        rounded="md"
        bg={useColorModeValue('brand.200', 'brand.700')}
    >
        <CardElement
            options={
                useColorMode().colorMode === 'light'
                    ? {
                          style: {
                              base: {
                                  fontSize: '16px',
                              },
                          },
                      }
                    : {
                          style: {
                              base: {
                                  fontSize: '16px',
                                  color: '#F0F0F0',
                                  '::placeholder': {
                                      color: '#888888',
                                  },
                              },
                              invalid: {
                                  color: '#FF4854',
                              },
                          },
                      }
            }
        />
    </Box>
);

const HelpText = () => (
    <Alert status="info" mb={4}>
        <AlertIcon />
        <AlertDescription fontSize="sm">
            <Text>Good test card: 4242 4242 4242 4242</Text>
            <Text>Bad test card: 4000 0000 0000 9995</Text>
            <Text>Input any number for date, CVC, and ZIP</Text>
        </AlertDescription>
    </Alert>
);

const CheckoutForm = ({ payableAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user, upgradeUserPlan } = useUser();

    const PaymentStatusAlert = () => (
        <Alert
            status={paymentSuccessful ? 'success' : 'error'}
            flexDirection="column"
            alignItems="center"
            py={10}
            mb={4}
        >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
                {paymentSuccessful ? 'Payment Successful' : 'Payment Failed'}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
                {paymentSuccessful
                    ? `You are now subscribed to the ${user?.plan} plan!`
                    : `An error occurred. Please try again.`}
            </AlertDescription>
        </Alert>
    );

    const PaymentSection = () => (
        <>
            <HelpText />
            <CreditCardInputBox />
            <Center>
                <Button
                    isLoading={isLoading}
                    mb={4}
                    colorScheme="brand"
                    onClick={handlePayment}
                    isDisabled={!user}
                    title={user ? '' : 'Log in to subscribe to plan'}
                >
                    Confirm Payment
                </Button>
            </Center>
        </>
    );

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

    const AlreadySubscribedWarning = () => (
        <Alert status="warning" mb={4}>
            <AlertIcon />
            <AlertDescription>
                <Text>You are already subscribed to the {user.plan} plan!</Text>
            </AlertDescription>
        </Alert>
    );

    return (
        <Box>
            {!isLoading && alertVisible && <PaymentStatusAlert />}
            {!paymentSuccessful && (
                <>
                    {user && user.plan !== 'Basic' ? (
                        <AlreadySubscribedWarning />
                    ) : (
                        <PaymentSection />
                    )}
                </>
            )}
        </Box>
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
