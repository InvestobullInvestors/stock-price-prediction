import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {Box, Container, Divider} from "@chakra-ui/react";

const PageTemplate = ({children, ...props}) => (
    <Box {...props}>

        <Navbar/>

        <Container maxW="container.xl">
            {children}
            <Divider mt={16} orientation="horizontal"/>
        </Container>

        <Footer/>

    </Box>
)

export default PageTemplate;
