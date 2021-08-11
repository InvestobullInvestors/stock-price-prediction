import React from 'react';
import {
    Divider,
    Image,
    Square,
    VStack,
    Flex,
    Spacer,
    HStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { useStockNews } from '../../contexts/useStockNews';
import NewsArticle from './NewsArticle';
import CustomBox from '../CustomBox';

const StockNewsCard = ({ stock, children, ...otherProps }) => {
    const { stockListNews } = useStockNews();

    let ticker_id;
    let name;
    let articles;
    let logoBlack;
    let logoWhite;
    let logo;

    let targetStock = stockListNews.find(
        (currStock) => currStock.ticker_id === stock.ticker_id
    );

    if (targetStock) {
        ticker_id = targetStock.ticker_id;
        name = targetStock.stock_name;
        articles = targetStock.news;
        logoBlack = process.env.PUBLIC_URL + ticker_id + '.png';
        logoWhite = process.env.PUBLIC_URL + ticker_id + '_white.png';
    } else {
        ticker_id = '';
        name = '';
        articles = [];
        logoBlack = '';
        logoWhite = '';
    }

    logoBlack = logoBlack.replace(/\s+/g, '-').toUpperCase();
    logoWhite = logoWhite.replace(/\s+/g, '-').toUpperCase();
    logo = useColorModeValue(logoBlack, logoWhite);

    return (
        <CustomBox
            width="100%"
            minW="100%"
            height="100%"
            mx={1}
            mt={5}
            px={4}
            py={4}
            className="my-box"
            {...otherProps}
        >
            {children}
            <Flex display={['none', 'none', 'flex', 'flex']} align="flex-start">
                <HStack ml="20px" mr="30px" mt="-15px" w="full">
                    <Square
                        w={['20%', '20%', '15%', '15%']}
                        h="150px"
                        borderRadius="lg"
                        p="10px"
                    >
                        <Image src={logo} />
                    </Square>
                    <Spacer />
                    <CustomBox
                        w={['78%', '78%', '83%', '83%']}
                        h="215px"
                        border={0}
                        shadow="none"
                        m={0}
                        p={2}
                        overflow="auto"
                        css={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            '&::-webkit-scrollbar': {
                                width: '0px',
                            },
                        }}
                    >
                        <VStack align="flex-start">
                            {articles.map((article) => (
                                <CustomBox
                                    key={article._id}
                                    w="100%"
                                    border={0}
                                    shadow="none"
                                    m={0}
                                    p={0}
                                >
                                    <NewsArticle
                                        date={article.publishedAt}
                                        title={article.title}
                                        url={article.url}
                                    />
                                    <Divider my={2} orientation="horizontal" />
                                </CustomBox>
                            ))}
                        </VStack>
                    </CustomBox>
                </HStack>
            </Flex>
            <Flex display={['flex', 'flex', 'none', 'none']} align="flex-start">
                <VStack mt="10px" align="center" w="full">
                    <CustomBox
                        w="100px"
                        border={0}
                        shadow="none"
                        p="10px"
                        mt={-9}
                        mb={-6}
                    >
                        <Image src={logo} />
                    </CustomBox>
                    <Spacer />
                    <CustomBox
                        w="100%"
                        h="150px"
                        border={0}
                        shadow="none"
                        m={0}
                        padding="5px"
                        overflow="auto"
                        css={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            '&::-webkit-scrollbar': {
                                width: '0px',
                            },
                        }}
                    >
                        <VStack align="flex-start">
                            {articles.map((article) => (
                                <CustomBox
                                    key={article._id}
                                    w="100%"
                                    border={0}
                                    shadow="none"
                                    m={0}
                                    p={0}
                                >
                                    <NewsArticle
                                        date={article.publishedAt}
                                        title={article.title}
                                        url={article.url}
                                    />
                                    <Divider my={2} orientation="horizontal" />
                                </CustomBox>
                            ))}
                        </VStack>
                    </CustomBox>
                </VStack>
            </Flex>
        </CustomBox>
    );
};

export default StockNewsCard;
