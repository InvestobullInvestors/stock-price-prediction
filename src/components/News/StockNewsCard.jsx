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
    Text,
} from '@chakra-ui/react';
import { useStockNews } from '../../contexts/useStockNews';
import NewsArticle from './NewsArticle';
import CustomBox from '../CustomBox';
import { BiChevronsDown } from 'react-icons/bi';

const ChevronsDown = () => (
    <PopoverContent background="transparent" border={0} shadow={0} mt="-25px">
        <Flex justify="center">
            <BiChevronsDown
                size={40}
                opacity={0.7}
                display="inline-block"
                w="100%"
            />
        </Flex>
    </PopoverContent>
);

const NewsContent = ({ articles }) => (
    <CustomBox
        w={{ base: '100%', md: '83%' }}
        h={{ base: '150px', md: '215px' }}
        border={0}
        shadow="none"
        m={0}
        p={{ base: '5px', md: 2 }}
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
            {articles.length !== 0 ? (
                articles.map((article) => (
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
                ))
            ) : (
                <Text mx={2} mt={{ base: '50px', md: '90px' }}>
                    No news data available.
                </Text>
            )}
        </VStack>
    </CustomBox>
);

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
                            <NewsContent articles={articles} />
                        </HStack>
                    </PopoverTrigger>
                    <ChevronsDown />
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
                            <NewsContent articles={articles} />
                        </VStack>
                    </PopoverTrigger>
                    <ChevronsDown />
                </Popover>
            </Flex>
        </CustomBox>
    );
};

export default StockNewsCard;
