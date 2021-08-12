import React, { useEffect } from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import ChecklistDrawer from '../components/News/ChecklistDrawer';
import CustomHeading from '../components/CustomHeading';
import { Flex, Grid, VStack } from '@chakra-ui/react';
import { useStockNews } from '../contexts/useStockNews';
import { useUser } from '../contexts/useUser';
import NewsCardList from '../components/News/NewsCardList';
import LoadingSpinner from '../components/LoadingSpinner';
import StickyChecklistContainer from '../components/News/StickyChecklistContainer';
import StockNewsCardList from '../components/News/StockNewsCardList';

const News = () => {
    const {
        setNewsInfoFromMongo,
        isDisplayingWatchlistStockNews,
        isNewsSelectionsFromMongoLoading,
        isStockNewsLoading,
        getStockListNews,
    } = useStockNews();

    const { user, watchlist } = useUser();

    useEffect(() => {
        setNewsInfoFromMongo();
    }, []);

    useEffect(() => {
        const tickers = [];
        watchlist.forEach(({ ticker }) => tickers.push(ticker));
        getStockListNews(tickers);
    }, [watchlist]);

    return (
        <PageTemplate>
            <CustomHeading mb={3}>News</CustomHeading>
            {isNewsSelectionsFromMongoLoading || isStockNewsLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Flex display={['none', 'none', 'none', 'flex']}>
                        <StickyChecklistContainer />
                        {user && isDisplayingWatchlistStockNews ? (
                            <StockNewsCardList />
                        ) : (
                            <NewsCardList />
                        )}
                    </Flex>
                    <VStack>
                        <Grid display={['flex', 'flex', 'flex', 'none']}>
                            <ChecklistDrawer />
                        </Grid>
                    </VStack>
                    <Grid display={['flex', 'flex', 'flex', 'none']}>
                        {user && isDisplayingWatchlistStockNews ? (
                            <StockNewsCardList />
                        ) : (
                            <NewsCardList />
                        )}
                    </Grid>
                </>
            )}
        </PageTemplate>
    );
};

export default News;
