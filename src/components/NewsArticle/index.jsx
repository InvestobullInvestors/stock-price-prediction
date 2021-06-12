import React from 'react';
import {
    Text,
    VStack,
    Link
} from '@chakra-ui/react';

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

export default NewsArticle;