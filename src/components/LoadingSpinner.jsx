import React from 'react';
import { Center, Spinner, useColorModeValue } from '@chakra-ui/react';

const LoadingSpinner = () => (
    <Center p={20}>
        <Spinner
            size="xl"
            color={useColorModeValue('brand.500', 'brand.400')}
        />
    </Center>
);

export default LoadingSpinner;
