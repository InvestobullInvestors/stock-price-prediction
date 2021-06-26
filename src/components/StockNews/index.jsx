import React from "react";
import {Box, Divider, Heading, Link, useColorModeValue, VStack} from "@chakra-ui/react";
import {useStockNews} from "../../hooks/useStockNews";

const CustomNewsBox = ({children}) => (
    <Box as="button" w="80%" minH={12} textAlign="left" my={8} px={8} _hover={{bgColor: "brand.600"}} borderRadius="lg">
        {children}
        <Divider py={3} orientation="horizontal"/>
    </Box>
)

const CustomNewsLink = ({children, link, ...otherProps}) => (
    <Link href={link}
          isExternal={true} w="100%" align="center" {...otherProps}>
        {children}
    </Link>
)

const StockNews = () => {
    const {stockNews} = useStockNews();
    return (
        <Box mt={10} bgColor={useColorModeValue("brand.100", "brand.700")} borderRadius="lg" pb={8}>
            <Heading as="h3" size="lg" p={8} textAlign="center">Stock News</Heading>
            <VStack>
                {stockNews.map(news => (
                    <CustomNewsLink link={news.src}>
                        <CustomNewsBox>
                            {news.title}
                        </CustomNewsBox>
                    </CustomNewsLink>
                ))}
            </VStack>
        </Box>
    )
}

export default StockNews;