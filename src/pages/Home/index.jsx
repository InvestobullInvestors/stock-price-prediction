import React from 'react';
import PageTemplate from '../../components/PageTemplate';
import { Heading } from '@chakra-ui/react';
import StockSearchBar from '../../components/StockSearchBar';
import StockTableCard from '../../components/StockTableCard';

const Home = () => (
    <PageTemplate>
        <Heading>Stock Market Overview</Heading>
        <StockSearchBar />
        <StockTableCard />
    </PageTemplate>
);

export default Home;
