import React from 'react';
import PageTemplate from "../../components/PageLayout/PageTemplate";
import CustomHeading from "../../components/CustomHeading";
import {Box, Center, Text, useColorModeValue} from "@chakra-ui/react";
import {useUser} from "../../contexts/useUser";

const CustomBox = ({children, ...otherProps}) => {
    const bgColor = useColorModeValue("brand.300", "brand.700")

    return <Box
        mx={3}
        mt={5}
        px={4}
        py={10}
        borderRadius='lg'
        shadow='md'
        bg={bgColor}
        {...otherProps}
    >
        {children}
    </Box>
}

const WatchlistItem = ({ticker}) => (
    <Text fontSize="xl" mx={8} my={4}>
        {ticker}
    </Text>
)

const Watchlist = () => {
    const {user, watchlist} = useUser()

    return <PageTemplate>
        <CustomHeading>Watchlist</CustomHeading>
        <CustomBox>
            {!user && <Center fontSize="xl" mx={8} my={4}>Sign in to use watchlist</Center>}
            {user && watchlist.map(doc => <WatchlistItem ticker={doc.ticker}/>)}
        </CustomBox>
    </PageTemplate>
}

export default Watchlist;
