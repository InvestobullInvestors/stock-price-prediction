import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => (
    <Center p={20}>
        <Spinner size="xl" />
    </Center>
);

export default LoadingSpinner;
