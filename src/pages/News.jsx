import React, { useEffect } from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import ChecklistDrawer from '../components/News/ChecklistDrawer';
import CustomHeading from '../components/CustomHeading';
import StaticChecklistContainer from '../components/News/StaticChecklistContainer';
import { Flex, Grid, Text, VStack } from '@chakra-ui/react';
import { useStockNews } from '../contexts/useStockNews';
import { useUser } from '../contexts/useUser';
import StockNewsCard from '../components/News/StockNewsCard';
import NewsCardList from '../components/News/NewsCardList';

const News = () => {
    const {
        setNewsInfoFromMongo,
        isDisplayingWatchlistStockNews,
    } = useStockNews();

    const { user, watchlist } = useUser();
    const { stockListNews, getStockListNews } = useStockNews();

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
            {/*<Button mt={7} bg={color} onClick={handleChangeColor}>watchlist only</Button>*/}
            <Flex display={['none', 'none', 'none', 'flex']}>
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
            </Flex>
            <VStack>
                <Grid display={['flex', 'flex', 'flex', 'none']}>
                    <ChecklistDrawer />
                </Grid>
            </VStack>
            <Grid display={['flex', 'flex', 'flex', 'none']}>
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
