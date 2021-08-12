import {
    Box,
    Heading,
    Text,
    useColorModeValue,
    VStack,
    Link,
} from '@chakra-ui/react';
import React from 'react';
import useDateFormat from '../../hooks/useDateFormat';

const NewsArticle = ({ date, title, url }) => {
    const dateColor = useColorModeValue('gray.600', 'gray.400');
    const formatDate = useDateFormat();
    const hoverColor = useColorModeValue('brand.500', 'brand.400');

    return (
        <VStack spacing="4px" align="flex-start">
            <Box
                as="button"
                w="100%"
                minH={10}
                p={2}
                m={0}
                textAlign="left"
                border={0}
                _hover={{ color: hoverColor }}
            >
                <Link
                    href={url}
                    isExternal
                    w="100%"
                    align="center"
                    style={{ textDecoration: 'none' }}
                >
                    <Text color={dateColor} textAlign="left">
                        {formatDate(date)}
                    </Text>
                    <Heading size="sm" textAlign="left">
                        {title}
                    </Heading>
                </Link>
            </Box>
        </VStack>
    );
};

export default NewsArticle;
