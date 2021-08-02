import React from "react";
import {
    Box,
    Divider,
    Heading,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { useStockNews } from "../../contexts/useStockNews";
import NewsArticle from "../NewsArticle";

const StockNews = () => {
    const { stockNews } = useStockNews();
    return (
        <Box
            mt={10}
            pb={8}
            bgColor={useColorModeValue("brand.100", "brand.700")}
            borderRadius="lg"
        >
            <Heading as="h3" size="lg" p={8} textAlign="center">
                Stock News
            </Heading>
            <VStack>
                {stockNews.map(({ _id, url, title }) => (
                    <Box key={_id} w="80%">
                        <NewsArticle
                            date="2021-01-01"
                            title={title}
                            url={url}
                        />
                        <Divider my={4} orientation="horizontal" />
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default StockNews;
