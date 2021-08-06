import React, { useEffect } from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import NewsCardList from '../components/News/NewsCardList';
import ChecklistDrawer from '../components/News/ChecklistDrawer';
import CustomHeading from '../components/CustomHeading';
import StaticChecklistContainer from '../components/News/StaticChecklistContainer';
import { Flex, Grid, VStack } from '@chakra-ui/react';
import { useStockNews } from '../contexts/useStockNews';

const News = () => {
    const { setNewsInfoFromMongo } = useStockNews();

    useEffect(() => {
        setNewsInfoFromMongo();
    }, []);

    //TODO: enable watchlist filter
    return (
        <PageTemplate>
            <CustomHeading mb={3}>News</CustomHeading>
            {/*<Button mt={7} bg={color} onClick={handleChangeColor}>watchlist only</Button>*/}
            <Flex display={['none', 'none', 'none', 'flex']}>
                <StaticChecklistContainer />
                <NewsCardList />
            </Flex>
            <VStack>
                <Grid display={['flex', 'flex', 'flex', 'none']}>
                    <ChecklistDrawer />
                </Grid>
            </VStack>
            <Grid display={['flex', 'flex', 'flex', 'none']}>
                <NewsCardList />
            </Grid>
        </PageTemplate>
    );
};

export default News;
