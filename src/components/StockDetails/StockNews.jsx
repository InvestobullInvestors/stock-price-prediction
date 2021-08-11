import React from 'react';
import {
    Box,
    Flex,
    Heading,
    HStack,
    Image,
    Link,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { useStockNews } from '../../contexts/useStockNews';
import NewsArticle from '../News/NewsArticle';
import LoadingSpinner from '../LoadingSpinner';
import CustomBox from '../CustomBox';

const NewsLayout = ({ _id, urlToImage, publishedAt, title }) => (
    <CustomBox
        width="100%"
        minW="100%"
        height="100%"
        mx={1}
        mt={5}
        px={4}
        py={4}
        className="my-box"
    >
        <Flex align="center">
            <Image
                boxSize="150px"
                objectFit="cover"
                src={urlToImage}
                borderRadius="lg"
            />
            <Box key={_id} w={{ base: '100%', md: '80%' }} px={8}>
                <NewsArticle
                    date={publishedAt}
                    title={title}
                    _hover={{
                        bgColor: useColorModeValue('brand.200', 'brand.700'),
                    }}
                />
            </Box>
        </Flex>
    </CustomBox>
);

const StockNews = ({ ...otherProps }) => {
    const { stockNews, isStockNewsLoading } = useStockNews();
    return (
        <CustomBox {...otherProps}>
            <Heading as="h3" size="lg" p={8} textAlign="center">
                Stock News
            </Heading>
            {isStockNewsLoading ? (
                <LoadingSpinner />
            ) : (
                <VStack align="flex-start" spacing={12} mx={16}>
                    {stockNews.map(
                        ({ _id, url, title, urlToImage, publishedAt }) => (
                            <Link
                                href={url}
                                isExternal
                                w="100%"
                                align="center"
                                style={{ textDecoration: 'none' }}
                            >
                                <HStack display={{ base: 'none', md: 'flex' }}>
                                    <NewsLayout
                                        _id={_id}
                                        urlToImage={urlToImage}
                                        publishedAt={publishedAt}
                                        title={title}
                                    />
                                </HStack>
                                <VStack
                                    display={{ base: 'flex', md: 'none' }}
                                    spacing={8}
                                >
                                    <NewsLayout
                                        _id={_id}
                                        urlToImage={urlToImage}
                                        publishedAt={publishedAt}
                                        title={title}
                                    />
                                </VStack>
                            </Link>
                        )
                    )}
                </VStack>
            )}
        </CustomBox>
    );
};

export default StockNews;
