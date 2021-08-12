import React from 'react';
import {
    Divider,
    Image,
    Square,
    VStack,
    Flex,
    Spacer,
    HStack,
    PopoverTrigger,
    Popover,
    PopoverContent,
} from '@chakra-ui/react';
import { useStockNews } from '../../contexts/useStockNews';
import NewsArticle from './NewsArticle';
import CustomBox from '../CustomBox';
import { BiChevronsDown } from 'react-icons/bi';

const StockNewsCard = ({ stock, children, ...otherProps }) => {
    const { stockListNews } = useStockNews();

    const targetStock = stockListNews.find(
        (currStock) => currStock.ticker_id === stock.ticker_id
    );

    const ticker_id = targetStock?.ticker_id;
    const articles = targetStock?.news;
    const logo = targetStock
        ? process.env.PUBLIC_URL + 'logos/stocks/' + ticker_id + '.png'
        : '';

    console.log(articles);

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
                <Popover trigger="hover">
                    <PopoverTrigger>
                        <HStack ml="20px" mr="30px" mt="-15px" w="full">
                            <Square
                                w={['20%', '20%', '15%', '15%']}
                                h="150px"
                                borderRadius="lg"
                                p="10px"
                                bg="brand.100"
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
                                            <Divider
                                                my={2}
                                                orientation="horizontal"
                                            />
                                        </CustomBox>
                                    ))}
                                </VStack>
                            </CustomBox>
                        </HStack>
                    </PopoverTrigger>
                    <PopoverContent
                        background="transparent"
                        border={0}
                        shadow={0}
                        mt="-25px"
                    >
                        <Flex justify="center">
                            <BiChevronsDown
                                size={40}
                                opacity={0.7}
                                display="inline-block"
                                w="100%"
                            />
                        </Flex>
                    </PopoverContent>
                </Popover>
            </Flex>
            <Flex display={['flex', 'flex', 'none', 'none']} align="flex-start">
                <Popover trigger="hover">
                    <PopoverTrigger>
                        <VStack mt="10px" align="center" w="full">
                            <Square
                                w="100px"
                                minH="100px"
                                borderRadius="lg"
                                p="10px"
                                mt={-9}
                                mb={-3}
                                bg="brand.100"
                            >
                                <Image src={logo} />
                            </Square>
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
                                            <Divider
                                                my={2}
                                                orientation="horizontal"
                                            />
                                        </CustomBox>
                                    ))}
                                </VStack>
                            </CustomBox>
                        </VStack>
                    </PopoverTrigger>
                    <PopoverContent
                        background="transparent"
                        border={0}
                        shadow={0}
                        mt="-25px"
                    >
                        <Flex justify="center">
                            <BiChevronsDown
                                size={40}
                                opacity={0.7}
                                display="inline-block"
                                w="100%"
                            />
                        </Flex>
                    </PopoverContent>
                </Popover>
            </Flex>
        </CustomBox>
    );
};

export default StockNewsCard;
