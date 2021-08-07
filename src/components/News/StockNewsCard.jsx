import React from "react";
import {Box, Center, Divider, Flex, HStack, Image, Square, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import NewsArticle from "../NewsArticle";
import CustomBox from "../CustomBox";

const StockNewsCard = ({name, news}) => {
    const textBoxColor = useColorModeValue("brand.100", "brand.600");
    const cardColor = useColorModeValue("brand.400", "brand.700");
    return (
        <Box
            width="100%"
            height="100%"
            mx={3}
            mt={5}
            px={4}
            py={4}
            borderRadius="lg"
            bg={cardColor}
        >
            <Flex display={["none", "none", "flex", "flex"]} align="flex-start">
                <HStack mt="10px" w="full">
                    <Square
                        w={{base: "100px", sm: "150px"}}
                        h={{base: "100px", sm: "150px"}}
                        borderRadius="lg"
                        shadow="md"
                        bg={textBoxColor}
                        p="10px"
                    >
                        <Text>{name}</Text>
                    </Square>
                    <Center height="150px">
                        <Divider orientation="vertical"/>
                    </Center>
                    <Box
                        w="full"
                        h="150px"
                        borderRadius="lg"
                        shadow="md"
                        bg={textBoxColor}
                        padding="5px"
                        css={{
                            margin: "0",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            overflow: "scroll",
                        }}
                    >
                        <VStack align="flex-start">
                            {
                                news.map(({url, title, publishedAt, _id}) => (
                                    <Box key={_id} w="100%">
                                        <NewsArticle
                                            date={publishedAt}
                                            title={title}
                                            url={url}/>
                                        <Divider my={2} orientation="horizontal"/>
                                    </Box>
                                ))
                            }
                        </VStack>
                    </Box>
                </HStack>
            </Flex>
            <Flex display={["flex", "flex", "none", "none"]} align="flex-start">
                <VStack mt="10px" align="center" w="full">
                    <CustomBox
                        w="100px"
                        borderRadius="lg"
                        shadow="md"
                        bg={textBoxColor}
                        p="10px"
                        mb={0}
                        mt={-9}
                    >
                        <Text>{name}</Text>
                    </CustomBox>
                    <Divider orientation="horizontal"/>
                    <Box
                        w="full"
                        h="150px"
                        border="1px"
                        borderColor={textBoxColor}
                        borderRadius="lg"
                        shadow="md"
                        bg={textBoxColor}
                        padding="5px"
                        css={{
                            margin: "0",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            overflow: "scroll",
                        }}
                    >
                        <VStack align="flex-start">
                            {
                                news.map(({url, title, publishedAt, _id}) => (
                                    <Box key={_id} w="100%">
                                        <NewsArticle
                                            date={publishedAt}
                                            title={title}
                                            url={url}/>
                                        <Divider my={2} orientation="horizontal"/>
                                    </Box>
                                ))
                            }
                        </VStack>
                    </Box>
                </VStack>
            </Flex>
        </Box>
    );
};

export default StockNewsCard;
