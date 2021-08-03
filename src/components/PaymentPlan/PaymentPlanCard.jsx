import React from "react";
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
} from "@chakra-ui/react";
import CreditCardInformation from "../CreditCardInformation";
import CustomBox from "../CustomBox";

const PaymentPlanCard = ({
    type,
    price,
    buttonText,
    details,
    ...otherProps
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const PaymentModal = ({ payableAmount }) => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Thank you for using Investobull</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {payableAmount ? (
                            <CreditCardInformation
                                payableAmount={payableAmount}
                            />
                        ) : (
                            "Redirecting"
                        )}
                    </ModalBody>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );

    return (
        <CustomBox
            bg={useColorModeValue("brand.400", "brand.700")}
            {...otherProps}
        >
            <VStack spacing={4}>
                <Heading as="h4" size="md">
                    {type}
                </Heading>
                <Text>USD ${price}/month</Text>
                <Button colorScheme="brand" onClick={onOpen}>
                    {buttonText}
                </Button>
                <PaymentModal payableAmount={price} />
                <VStack align="flex-start" spacing={6}>
                    {details.map((detail) => (
                        <Text key={detail}>{detail}</Text>
                    ))}
                </VStack>
            </VStack>
        </CustomBox>
    );
};

export default PaymentPlanCard;
