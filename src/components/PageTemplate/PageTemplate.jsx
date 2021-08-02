import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, Container, Divider, useColorModeValue } from "@chakra-ui/react";

const PageTemplate = ({ children, ...props }) => (
    <Box
        bgColor={useColorModeValue("brand.50", "brand.800")}
        minH="100vH"
        {...props}
    >
        <Navbar />
        <Container maxW="container.xl">
            {children}
            <Divider mt={16} orientation="horizontal" />
        </Container>
        <Footer />
    </Box>
);

export default PageTemplate;
