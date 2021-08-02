import { Divider, Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import NewsChecklist from "./NewsChecklist";
import React from "react";
import CustomBox from "../CustomBox";

const StaticChecklistContainer = () => {
    const boxColor = useColorModeValue("brand.400", "brand.700");

    return (
        <CustomBox p="4" ml="2" mt={5} bgColor={boxColor}>
            <VStack>
                <Heading size="md">Sources</Heading>
                <Divider orientation="horizontal" />
                <NewsChecklist />
            </VStack>
        </CustomBox>
    );
};

export default StaticChecklistContainer;
