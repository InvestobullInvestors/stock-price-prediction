import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const CustomBox = ({ children, ...otherProps }) => (
    <Box
        m={4}
        p={8}
        borderRadius="lg"
        shadow="sm"
        bg={useColorModeValue('brand.100', 'brand.800')}
        border="1px"
        borderColor={useColorModeValue('brand.200', 'brand.700')}
        {...otherProps}
    >
        {children}
    </Box>
);

export default CustomBox;
