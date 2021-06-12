import React from 'react';
import {
    Box,
    Text,
    VStack,
    useColorModeValue,
    Flex,
    Spacer,
    Divider
} from '@chakra-ui/react';
import { CloseIcon, DragHandleIcon } from "@chakra-ui/icons"

import NewsArticle from "../NewsArticle";

const NewsCard = ({source, price, buttonText, details, ...otherProps}) => {
    const boxColor = useColorModeValue("brand.100", "brand.700");

    return (
        <Box mx={3} mt={5} px={4} py={4} borderRadius="lg" shadow="md" bg={boxColor} {...otherProps}>
            <Flex>
                <DragHandleIcon />
                <Spacer />
                <CloseIcon />
            </Flex>
            <VStack>
                <Text mt="5px" fontSize="xl" fontWeight="bold">{source}</Text>
                <NewsArticle date={"2021-06-11"} title={"Fed to Sell Corporate Bonds"} article={"https://www.ft.com/content/ea1da319-98b2-4440-8ea9-471c986502ff"}></NewsArticle>
                <Divider my={16} orientation="horizontal" variant="dashed"/>
                <NewsArticle date={"2021-06-11"} title={"Fed to Sell Corporate Bonds"} article={"https://www.ft.com/content/ea1da319-98b2-4440-8ea9-471c986502ff"}></NewsArticle>
                <Divider my={16} orientation="horizontal" variant="dashed"/>
                <NewsArticle date={"2021-06-11"} title={"Fed to Sell Corporate Bonds"} article={"https://www.ft.com/content/ea1da319-98b2-4440-8ea9-471c986502ff"}></NewsArticle>
                <Divider my={16} orientation="horizontal" variant="dashed"/>
                <NewsArticle date={"2021-06-11"} title={"Fed to Sell Corporate Bonds"} article={"https://www.ft.com/content/ea1da319-98b2-4440-8ea9-471c986502ff"}></NewsArticle>
            </VStack>
        </Box>
    )
}

export default NewsCard;