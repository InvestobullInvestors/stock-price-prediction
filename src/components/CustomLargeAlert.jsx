import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
} from '@chakra-ui/react';
import React from 'react';

const CustomLargeAlert = ({ status, title, description }) => (
    <Alert
        status={status}
        flexDirection="column"
        alignItems="center"
        py={10}
        mb={4}
    >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
            {title}
        </AlertTitle>
        <AlertDescription textAlign="center">{description}</AlertDescription>
    </Alert>
);

export default CustomLargeAlert;
