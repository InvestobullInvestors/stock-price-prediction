import React from 'react';
import {
    Box,
    Text,
    VStack,
    Button,
    useColorModeValue,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    ModalHeader,
} from '@chakra-ui/react';
import CreditCardInformation from '../CreditCardInformation';

const PaymentPlanCard = ({
    type,
    price,
    buttonText,
    details,
    ...otherProps
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const boxColor = useColorModeValue('brand.100', 'brand.700');
    const PaymentModal = ({ payableAmount }) => {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            Thank you for using Investobull
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {payableAmount ? (
                                <CreditCardInformation
                                    payableAmount={payableAmount}
                                />
                            ) : (
                                'Redirecting'
                            )}
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        );
    };

    return (
        <Box
            mx={3}
            mt={5}
            px={4}
            py={10}
            borderRadius='lg'
            shadow='md'
            bg={boxColor}
            {...otherProps}
        >
            <VStack>
                <Text>{type}</Text>
                <Text>USD ${price}/month</Text>
                <Button colorScheme='brand' onClick={onOpen}>
                    {buttonText}
                </Button>
                <PaymentModal payableAmount={price} />
                {details.map((detail) => (
                    <Text key={detail}>{detail}</Text>
                ))}
            </VStack>
        </Box>
    );
};

export default PaymentPlanCard;
