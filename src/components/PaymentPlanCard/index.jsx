import React from 'react';
import {Box, Text, VStack, Button, useColorModeValue} from '@chakra-ui/react';

const PaymentPlanCard = ({type, price, buttonText, details, ...otherProps}) => {
    const boxColor = useColorModeValue("brand.100", "brand.700");
    return (
    <Box mx={3} mt={5} px={4} py={10} borderRadius="lg" shadow="md" bg={boxColor} {...otherProps}>
        <VStack>
            <Text>{type}</Text>
            <Text>USD ${price}/month</Text>
            <Button colorScheme="brand">{buttonText}</Button>
            {details.map(detail => <Text key={detail}>{detail}</Text>)}
        </VStack>
    </Box>
)}

export default PaymentPlanCard;