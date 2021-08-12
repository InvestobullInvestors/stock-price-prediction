import React from 'react';
import {
    Box,
    Grid,
    GridItem,
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
    <Box width="100%" minW="100%" height="100%">
        <Grid
            templateColumns={{
                base: 'repeat(1, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(6, 1fr)',
            }}
            alignItems="center"
        >
            <GridItem colSpan={1}>
                <Image
                    boxSize="150px"
                    objectFit="cover"
                    src={urlToImage}
                    borderRadius="lg"
                />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 3, lg: 5 }}>
                <Box key={_id} w="100%" pr={8}>
                    <NewsArticle
                        date={publishedAt}
                        title={title}
                        _hover={{
                            bgColor: useColorModeValue(
                                'brand.200',
                                'brand.700'
                            ),
                        }}
                    />
                </Box>
            </GridItem>
        </Grid>
    </Box>
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
                <VStack align="flex-start" spacing={12} mx={8}>
                    {stockNews.map(
                        ({ _id, url, title, urlToImage, publishedAt }) => (
                            <Link
                                key={_id}
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
