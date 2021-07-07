import React from 'react';
import PageTemplate from '../../components/PageTemplate';
import { Heading, useColorModeValue } from '@chakra-ui/react';
import StockSearchBar from '../../components/StockSearchBar';
import StockTableCard from '../../components/StockTableCard';
import StockListProvider from '../../hooks/useStockList';

const Home = () => (
    <StockListProvider>
        <PageTemplate bgColor={useColorModeValue('brand.300', 'brand.800')}>
            <Heading>Stock Market Overview</Heading>
            <StockSearchBar />
            <StockTableCard />
        </PageTemplate>
    </StockListProvider>
);

export default Home;
