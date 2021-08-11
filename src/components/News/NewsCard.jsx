import React from 'react';
import {
    Divider,
    Image,
    Square,
    useColorModeValue,
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

const NewsCard = ({ source, children, ...otherProps }) => {
    const { newsInfo } = useStockNews();

    let name;
    let articles;
    let logoBlack;
    let logoWhite;
    let logo;

    let targetSource = newsInfo.find(
        (currSource) => currSource.id === source.id
    );

    if (targetSource) {
        name = targetSource.name;
        articles = targetSource.articles;
        logoBlack = process.env.PUBLIC_URL + name + '.png';
        logoWhite = process.env.PUBLIC_URL + name + '_white.png';
    } else {
        name = '';
        articles = [];
        logoBlack = '';
        logoWhite = '';
    }

    logoBlack = logoBlack.replace(/\s+/g, '-').toLowerCase();
    logoWhite = logoWhite.replace(/\s+/g, '-').toLowerCase();
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
                <Popover trigger="hover">
                    <PopoverTrigger>
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

export default NewsCard;
