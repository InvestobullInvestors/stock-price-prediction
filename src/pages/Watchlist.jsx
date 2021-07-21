import React from 'react';
import PageTemplate from "../components/PageTemplate/PageTemplate";
import CustomHeading from "../components/CustomHeading";
import {Center, Text} from "@chakra-ui/react";
import {useUser} from "../contexts/useUser";
import CustomBox from "../components/CustomBox";

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
            {
                user ?
                    watchlist.map(({ticker}) => <WatchlistItem ticker={ticker}/>) :
                    <Center fontSize="xl" mx={8} my={4}>Sign in to use watchlist</Center>
            }
        </CustomBox>
    </PageTemplate>
}

export default Watchlist;
