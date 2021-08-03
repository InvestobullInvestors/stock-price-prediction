import { Box, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";

const NewsArticle = ({ date, title, url }) => {
    const dateColor = useColorModeValue("gray.600", "gray.400");
    const hoverColor = useColorModeValue("brand.300", "brand.500");

    return (
        <VStack spacing="0px" align="flex-start">
            <Box>
                <Text color={dateColor} px={2}>
                    {date}
                </Text>
                <Link href={url} isExternal w="100%" align="center">
                    <Box
                        as="button"
                        w="100%"
                        minH={10}
                        textAlign="left"
                        px={2}
                        borderRadius="lg"
                        _hover={{ bgColor: hoverColor }}
                    >
                        {title}
                    </Box>
                </Link>
            </Box>
        </VStack>
    );
};

export default NewsArticle;
