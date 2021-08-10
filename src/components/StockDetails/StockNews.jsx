import React from 'react';
import {
    Box,
    Heading,
    HStack,
    Image,
    Link,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { useStockNews } from '../../contexts/useStockNews';
import NewsArticle from '../NewsArticle';
import LoadingSpinner from '../LoadingSpinner';
import CustomBox from '../CustomBox';

const NewsLayout = ({ _id, urlToImage, publishedAt, title }) => (
    <>
        <Image boxSize="150px" objectFit="cover" src={urlToImage} />
        <Box key={_id} w={{ base: '100%', md: '80%' }} px={8}>
            <NewsArticle date={publishedAt} title={title} />
        </Box>
    </>
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
                            <Link href={url} isExternal w="100%" align="center">
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
