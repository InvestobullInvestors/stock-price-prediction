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
import CustomBox from '../CustomBox';

const NewsArticle = ({ date, title, url }) => {
    const dateColor = useColorModeValue('gray.600', 'gray.400');
    const formatDate = useDateFormat();
    const hoverColor = useColorModeValue('brand.300', 'brand.500');

    return (
        <VStack spacing="4px" align="flex-start">
            <CustomBox
                as="button"
                w="100%"
                minH={10}
                p={2}
                m={0}
                textAlign="left"
                borderRadius="lg"
                border={0}
                shadow="none"
                _hover={{ bgColor: hoverColor }}
            >
                <Link
                    href={url}
                    isExternal
                    w="100%"
                    align="center"
                    style={{ textDecoration: 'none' }}
                >
                    <Text color={dateColor} px={2}>
                        {formatDate(date)}
                    </Text>
                    <Heading size="md">{title}</Heading>
                </Link>
            </CustomBox>
        </VStack>
    );
};

export default NewsArticle;
