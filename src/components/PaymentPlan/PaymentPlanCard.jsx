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

const PaymentPlanCard = ({
    plan,
    price,
    buttonText,
    details,
    planColor,
    ...otherProps
}) => {
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
        <CustomBox {...otherProps}>
            <VStack spacing={6}>
                <Heading
                    as="h4"
                    size="xl"
                    color={planColor}
                    fontFamily="Georgia"
                >
                    {plan}
                </Heading>
                {price ? (
                    <>
                        <Heading size="md">USD ${price}/month</Heading>
                        <Button onClick={onOpen} colorScheme="brand">
                            {buttonText}
                        </Button>
                    </>
                ) : (
                    <>
                        <Heading size="md">Free</Heading>
                        <Button as={Link} to="/" colorScheme="brand">
                            {buttonText}
                        </Button>
                    </>
                )}
                <VStack align="flex-start" w="80%" spacing={6}>
                    {details.map((detail, id) => (
                        <Text key={id}>{detail}</Text>
                    ))}
                </VStack>
                <PaymentModal payableAmount={price} />
            </VStack>
        </CustomBox>
    );
};

export default PaymentPlanCard;
