import React from "react";
import {Box, Container, useColorModeValue} from "@chakra-ui/react";
import Header from "../Header";

const PageTemplate = ({children, ...otherProps}) => (
    <Box {...otherProps} minH="100vH">
        <Header bgColor={useColorModeValue("gray.300", "gray.800")}/>
        <Container maxW="container.xl">
            {children}
        </Container>
        {/*<Footer/> /!*Weiyoung*!/*/}
    </Box>
)

export default PageTemplate;
