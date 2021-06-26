import React from 'react';
import {Box, Flex, Link, Spacer, Text, useColorModeValue, VStack} from '@chakra-ui/react';
import {CloseIcon, DragHandleIcon} from "@chakra-ui/icons"
import {useStockNews} from "../../hooks/useStockNews";

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

    const {allNewsInfo} = useStockNews();

    let newsDetails = allNewsInfo.filter(newsInfo => newsInfo.name === source)
    let newsArticles;

    if (newsDetails.length === 1) {
        newsArticles = allNewsInfo.filter(newsInfo => newsInfo.name === source)[0].articles
    } else {
        newsArticles = [];
    }

    return (
        <Box mx={3} mt={5} px={4} py={4} borderRadius="lg" shadow="md" bg={boxColor} {...otherProps}>
            <Flex>
                <DragHandleIcon/>
                <Spacer/>
                <CloseIcon/>
            </Flex>
            <Text align="center" mt="5px" fontSize="xl" fontWeight="bold">{source}</Text>

            <VStack align="flex-start">
                {
                    newsArticles.map(article => <NewsArticle date={article.date} title={article.title}
                                                             article={article.src}/>)
                }
            </VStack>
        </Box>
    )
}

export default NewsCard;