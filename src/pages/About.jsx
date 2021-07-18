import React from 'react';
import PageTemplate from "../components/PageTemplate/PageTemplate";
import AboutTeam from "../components/About/AboutTeam";
import CustomHeading from "../components/CustomHeading";
import {Box, Text, useColorModeValue} from "@chakra-ui/react";

const AboutInvestobull = () => {
    const bgColor = useColorModeValue("brand.300", "brand.700")
    return (
        <Box m={4} p={8} borderRadius="lg" shadow="md" bg={bgColor}>
            <Text lineHeight={8}>
                (Placeholder)
                This web app will be used by everyday investors who have a limited understanding of the technical and fundamental
                factors affecting blue chip stock prices. Our system will provide detailed insights into commonly used analysis
                models—such as discounted cash flow (DCF)in order to predict a stock's future price. We will differentiate our
                service from competitors’ offerings by providing users with transparents metrics that explain how we derive our
                projections. Our goal is to help users make better-informed decisions with their investments.
            </Text>
        </Box>
    )
}

const About = () => (
    <PageTemplate>
        <CustomHeading>About InvestoBull</CustomHeading>
        <AboutInvestobull/>
        <CustomHeading>About Our Team</CustomHeading>
        <AboutTeam/>
    </PageTemplate>
)

export default About;
