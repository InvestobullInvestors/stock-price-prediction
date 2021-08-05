import React, { useEffect } from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import ChecklistDrawer from '../components/News/ChecklistDrawer';
import CustomHeading from '../components/CustomHeading';
import StaticChecklistContainer from '../components/News/StaticChecklistContainer';
import { Grid, Text, VStack } from '@chakra-ui/react';
import { useStockNews } from '../contexts/useStockNews';
import { useUser } from '../contexts/useUser';
import StockNewsCard from '../components/News/StockNewsCard';
import NewsCardList from '../components/News/NewsCardList';

const News = () => {
    const {
        setNewsSelectionsFromFirebase,
        setNewsInfoFromMongo,
        isDisplayingWatchlistStockNews,
    } = useStockNews();

    const { user, watchlist } = useUser();
    const { stockListNews, getStockListNews } = useStockNews();

    useEffect(() => {
        setNewsSelectionsFromFirebase();
        setNewsInfoFromMongo();
    }, []);

    useEffect(() => {
        const tickers = [];
        watchlist.forEach(({ ticker }) => tickers.push(ticker));
        getStockListNews(tickers);
    }, [watchlist]);

    return (
        <PageTemplate>
            <VStack>
                <CustomHeading mb={3}>News</CustomHeading>
                <Grid display={['flex', 'flex', 'none', 'none']}>
                    <ChecklistDrawer />
                </Grid>
            </VStack>
            <Grid display={['none', 'none', 'flex', 'flex']}>
                <StaticChecklistContainer />
                <VStack>
                    {user && isDisplayingWatchlistStockNews ? (
                        stockListNews.map(({ stock_name, news }) => {
                            return (
                                <StockNewsCard name={stock_name} news={news} />
                            );
                        })
                    ) : (
                        <NewsCardList />
                    )}
                </VStack>
            </Grid>
            <Grid display={['flex', 'flex', 'none', 'none']}>
                <VStack>
                    {user && isDisplayingWatchlistStockNews ? (
                        stockListNews.map(({ stock_name, news }) => {
                            return (
                                <StockNewsCard name={stock_name} news={news} />
                            );
                        })
                    ) : (
                        <NewsCardList />
                    )}
                </VStack>
            </Grid>
        </PageTemplate>
    );
};

export default News;
