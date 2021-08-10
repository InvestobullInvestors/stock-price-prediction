import React, { useEffect } from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import ChecklistDrawer from '../components/News/ChecklistDrawer';
import CustomHeading from '../components/CustomHeading';
import StaticChecklistContainer from '../components/News/StaticChecklistContainer';
import { Grid, VStack } from '@chakra-ui/react';
import { useStockNews } from '../contexts/useStockNews';
import { useUser } from '../contexts/useUser';
import StockNewsCard from '../components/News/StockNewsCard';
import NewsCardList from '../components/News/NewsCardList';
import LoadingSpinner from '../components/LoadingSpinner';

const News = () => {
    const {
        setNewsSelectionsFromFirebase,
        setNewsInfoFromMongo,
        isDisplayingWatchlistStockNews,
        isNewsSelectionsFromFirebaseLoading,
        isNewsSelectionsFromMongoLoading,
        isStockNewsLoading,
        stockListNews,
        getStockListNews,
    } = useStockNews();

    const { user, watchlist } = useUser();

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
                {isNewsSelectionsFromFirebaseLoading ||
                isNewsSelectionsFromMongoLoading ||
                isStockNewsLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <Grid display={['flex', 'flex', 'none', 'none']}>
                            <ChecklistDrawer />
                        </Grid>
                        <Grid display={['none', 'none', 'flex', 'flex']}>
                            <StaticChecklistContainer />
                            <VStack>
                                {user && isDisplayingWatchlistStockNews ? (
                                    stockListNews.map(
                                        ({ stock_name, news }) => {
                                            return (
                                                <StockNewsCard
                                                    name={stock_name}
                                                    news={news}
                                                />
                                            );
                                        }
                                    )
                                ) : (
                                    <NewsCardList />
                                )}
                            </VStack>
                        </Grid>
                        <Grid display={['flex', 'flex', 'none', 'none']}>
                            <VStack>
                                {user && isDisplayingWatchlistStockNews ? (
                                    stockListNews.map(
                                        ({ stock_name, news }) => {
                                            return (
                                                <StockNewsCard
                                                    name={stock_name}
                                                    news={news}
                                                />
                                            );
                                        }
                                    )
                                ) : (
                                    <NewsCardList />
                                )}
                            </VStack>
                        </Grid>
                    </>
                )}
            </VStack>
        </PageTemplate>
    );
};

export default News;
