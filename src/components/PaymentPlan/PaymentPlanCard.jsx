import React from 'react';
import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import CreditCardInformation from '../CreditCardInformation';
import CustomBox from '../CustomBox';
import { useUser } from '../../contexts/useUser';

const PaymentPlanCard = ({
    plan,
    price,
    buttonText,
    details,
    planColor,
    ...otherProps
}) => {
    const { user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const PaymentModal = ({ payableAmount }) => (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Confirm Subscription</ModalHeader>
                    <ModalBody>
                        <CreditCardInformation
                            payableAmount={payableAmount}
                            closePaymentModal={onClose}
                        />
                    </ModalBody>
                    <ModalCloseButton />
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );

    return (
        <CustomBox
            bg={useColorModeValue('brand.200', 'brand.700')}
            {...otherProps}
        >
            <VStack spacing={8}>
                <Heading as="h4" size="xl" color={planColor}>
                    {plan}
                </Heading>
                {price ? (
                    <>
                        <Heading size="lg">USD ${price}/month</Heading>
                        <Button
                            // TODO: replace null with Sign Up Popup (waiting for PR #94 to merge)
                            onClick={user ? onOpen : null}
                            colorScheme="brand"
                        >
                            {buttonText}
                        </Button>
                    </>
                ) : (
                    <>
                        <Heading size="lg">Free</Heading>
                        <Button as={Link} to="/" colorScheme="brand">
                            {buttonText}
                        </Button>
                    </>
                )}
                <VStack align="flex-start" w="80%" spacing={6}>
                    {details.map((detail) => (
                        <Text key={detail} fontSize="lg">
                            {detail}
                        </Text>
                    ))}
                </VStack>
                <PaymentModal payableAmount={price} />
            </VStack>
        </CustomBox>
    );
};

export default PaymentPlanCard;
