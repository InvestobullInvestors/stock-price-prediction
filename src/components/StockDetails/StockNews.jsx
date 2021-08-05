import React from 'react';
import {
    Box,
    Divider,
    Heading,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { useStockNews } from '../../contexts/useStockNews';
import NewsArticle from '../NewsArticle';
import LoadingSpinner from '../LoadingSpinner';
import CustomBox from '../CustomBox';

const StockNews = () => {
    const { stockNews, isStockNewsLoading } = useStockNews();
    return (
        <CustomBox bgColor={useColorModeValue('brand.100', 'brand.700')}>
            <Heading as="h3" size="lg" p={8} textAlign="center">
                Stock News
            </Heading>
            {isStockNewsLoading ? (
                <LoadingSpinner />
            ) : (
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
            )}
        </CustomBox>
    );
};

export default StockNews;
