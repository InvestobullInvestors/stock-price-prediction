import React from 'react';
import {
    Box,
    Divider,
    Image,
    Square,
    useColorModeValue,
    VStack,
    Flex,
    Spacer,
} from '@chakra-ui/react';
import { useStockNews } from '../../contexts/useStockNews';
import NewsArticle from '../NewsArticle';
import CustomBox from '../CustomBox';

function formatDate(date) {
    let year = parseInt(date.slice(0, 4));
    let month = parseInt(date.slice(6, 7));
    let day = parseInt(date.slice(9, 10));
    let dateObj = new Date(year, month - 1, day);

    let options = { year: 'numeric', month: 'long', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

const StockNewsCard = ({ stock, children, ...otherProps }) => {
    const cardColor = useColorModeValue('brand.400', 'brand.700');
    const textBoxColor = useColorModeValue('brand.100', 'brand.600');

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
        <Box
            width="100%"
            minW="100%"
            height="100%"
            mx={1}
            mt={5}
            px={4}
            py={4}
            borderRadius="lg"
            bg={cardColor}
            className="my-box"
            {...otherProps}
        >
            {children}
            <Flex display={['none', 'none', 'flex', 'flex']} mt="10px">
                <Square
                    w={['20%', '20%', '15%', '15%']}
                    h="150px"
                    borderRadius="lg"
                    shadow="md"
                    bg={textBoxColor}
                    p="10px"
                >
                    <Image src={logo} />
                </Square>
                <Spacer />
                <Box
                    w={['78%', '78%', '83%', '83%']}
                    h="150px"
                    borderRadius="lg"
                    shadow="md"
                    bg={textBoxColor}
                    padding="5px"
                    css={{
                        margin: '0',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        overflow: 'scroll',
                    }}
                >
                    <VStack align="flex-start">
                        {articles.map((article) => (
                            <Box key={article._id} w="100%">
                                <NewsArticle
                                    date={formatDate(article.publishedAt)}
                                    title={article.title}
                                    url={article.url}
                                />
                                <Divider my={2} orientation="horizontal" />
                            </Box>
                        ))}
                    </VStack>
                </Box>
            </Flex>
            <Flex
                display={['flex', 'flex', 'none', 'none']}
                direction="column"
                align="center"
                h="100%"
            >
                <CustomBox
                    w="100px"
                    borderRadius="lg"
                    shadow="md"
                    bg={textBoxColor}
                    p="10px"
                    // mb={0}
                    mt="-7"
                >
                    <Image src={logo} />
                </CustomBox>
                <Spacer />
                <Box
                    w="100%"
                    h="150px"
                    border="1px"
                    borderColor={textBoxColor}
                    borderRadius="lg"
                    shadow="md"
                    bg={textBoxColor}
                    padding="5px"
                    css={{
                        margin: '0',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        overflow: 'scroll',
                    }}
                >
                    <VStack align="flex-start">
                        {articles.map((article) => (
                            <Box key={article._id} w="100%">
                                <NewsArticle
                                    date={formatDate(article.publishedAt)}
                                    title={article.title}
                                    url={article.url}
                                />
                                <Divider my={2} orientation="horizontal" />
                            </Box>
                        ))}
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};

export default StockNewsCard;
