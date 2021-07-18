import React from 'react';
import {
    Text,
    VStack,
    Button,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    ModalHeader,
} from '@chakra-ui/react';
import CreditCardInformation from '../CreditCardInformation';
import CustomBox from "../CustomBox";

const PaymentPlanCard = ({
    type,
    price,
    buttonText,
    details,
    ...otherProps
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
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
        <CustomBox {...otherProps}>
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
        </CustomBox>
    );
};

export default PaymentPlanCard;
