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
    HStack,
} from '@chakra-ui/react';
import { useStockNews } from '../../contexts/useStockNews';
import NewsArticle from '../NewsArticle';
import CustomBox from '../CustomBox';

const NewsCard = ({ source, children, ...otherProps }) => {
    const cardColor = useColorModeValue('brand.400', 'brand.700');
    const textBoxColor = useColorModeValue('brand.100', 'brand.600');

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
            <Flex display={['none', 'none', 'flex', 'flex']} align="flex-start">
                <HStack mt="10px" w="full">
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
                                        date={article.publishedAt}
                                        title={article.title}
                                        url={article.url}
                                    />
                                    <Divider my={2} orientation="horizontal" />
                                </Box>
                            ))}
                        </VStack>
                    </Box>
                </HStack>
            </Flex>
            <Flex display={['flex', 'flex', 'none', 'none']} align="flex-start">
                <VStack mt="10px" align="center" w="full">
                    <CustomBox
                        w="100px"
                        borderRadius="lg"
                        shadow="md"
                        bg={textBoxColor}
                        p="10px"
                        mb={0}
                        mt={-9}
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
                                        date={article.publishedAt}
                                        title={article.title}
                                        url={article.url}
                                    />
                                    <Divider my={2} orientation="horizontal" />
                                </Box>
                            ))}
                        </VStack>
                    </Box>
                </VStack>
            </Flex>
        </Box>
    );
};

export default NewsCard;
