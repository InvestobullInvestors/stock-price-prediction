import {
    Box,
    Heading,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import React from 'react';

const NewsArticle = ({ date, title }) => {
    const dateColor = useColorModeValue('gray.600', 'gray.400');

    return (
        <VStack spacing="4px" align="flex-start">
            <Box
                as="button"
                w="100%"
                minH={10}
                textAlign="left"
                px={2}
                borderRadius="lg"
            >
                <Heading size="md">{title}</Heading>
            </Box>
            <Text color={dateColor} px={2}>
                {date}
            </Text>
        </VStack>
    );
};

export default NewsArticle;
