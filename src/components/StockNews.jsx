import React from "react";
import {Box, Divider, Heading, Link, useColorModeValue, VStack} from "@chakra-ui/react";
import {useStockNews} from "../contexts/useStockNews";

const CustomNewsLink = ({children, url, ...otherProps}) => (
    <Link href={url} isExternal w="100%" align="center" {...otherProps}>
        <Box as="button" w="100%" minH={16} textAlign="left" px={4} borderRadius="lg"
             _hover={{bgColor: useColorModeValue("brand.300", "brand.600")}}>
            {children}
        </Box>
    </Link>
)

const StockNews = () => {
    const {stockNews} = useStockNews();
    return (
        <Box mt={10} pb={8} bgColor={useColorModeValue("brand.100", "brand.700")} borderRadius="lg">
            <Heading as="h3" size="lg" p={8} textAlign="center">Stock News</Heading>
            <VStack>
                {stockNews.map(({_id, url, title}) => (
                    <Box key={_id} w="80%">
                        <CustomNewsLink url={url}>
                            {title}
                        </CustomNewsLink>
                        <Divider my={4} orientation="horizontal"/>
                    </Box>
                ))}
            </VStack>
        </Box>
    )
}

export default StockNews;