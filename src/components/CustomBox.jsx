import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

const CustomBox = ({ children, ...otherProps }) => (
    <Box
        m={4}
        p={8}
        borderRadius="lg"
        shadow="md"
        bg={useColorModeValue("brand.300", "brand.700")}
        {...otherProps}
    >
        {children}
    </Box>
);

export default CustomBox;
