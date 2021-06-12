import React from 'react';
import {
    Box,
    Text,
    VStack,
    useColorModeValue,
    Flex,
    Spacer,
    Divider, Link
} from '@chakra-ui/react';
import { CloseIcon, DragHandleIcon } from "@chakra-ui/icons"

const NewsArticle = ({date, title, article}) => {

    return (
        <VStack
            spacing="0px"
            align="flex-start"
        >
            <Text color="gray.500">{date}</Text>
            <Link href={article}>{title}</Link>
        </VStack>
    )
}

const NewsCard = ({source, price, buttonText, details, ...otherProps}) => {
    const boxColor = useColorModeValue("brand.100", "brand.700");

    return (
        <Box mx={3} mt={5} px={4} py={4} borderRadius="lg" shadow="md" bg={boxColor} {...otherProps}>
            <Flex>
                <DragHandleIcon />
                <Spacer />
                <CloseIcon />
            </Flex>
            <Text align="center" mt="5px" fontSize="xl" fontWeight="bold">{source}</Text>
            <VStack align="flex-start">
                <NewsArticle date={"2021-06-11"} title={"Fed to Sell Corporate Bonds"} article={"https://www.ft.com/content/ea1da319-98b2-4440-8ea9-471c986502ff"}/>
                <Divider my={16} orientation="horizontal" variant="dashed"/>
                <NewsArticle date={"2021-06-11"} title={"Fed to Sell Corporate Bonds"} article={"https://www.ft.com/content/ea1da319-98b2-4440-8ea9-471c986502ff"}/>
                <Divider my={16} orientation="horizontal" variant="dashed"/>
                <NewsArticle date={"2021-06-11"} title={"Fed to Sell Corporate Bonds"} article={"https://www.ft.com/content/ea1da319-98b2-4440-8ea9-471c986502ff"}/>
                <Divider my={16} orientation="horizontal" variant="dashed"/>
                <NewsArticle date={"2021-06-11"} title={"Fed to Sell Corporate Bonds"} article={"https://www.ft.com/content/ea1da319-98b2-4440-8ea9-471c986502ff"}/>
            </VStack>
        </Box>
    )
}

export default NewsCard;