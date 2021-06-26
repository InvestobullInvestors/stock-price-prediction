import React from 'react';
import {Center, Heading} from "@chakra-ui/react";

const CustomHeading = ({children, ...otherProps}) => (
    <Center>
        <Heading as="h2" size="xl" {...otherProps}>
            {children}
        </Heading>
    </Center>
)

export default CustomHeading;
