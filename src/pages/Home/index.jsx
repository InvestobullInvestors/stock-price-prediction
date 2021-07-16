import React, { useEffect } from 'react';
import PageTemplate from '../../components/PageTemplate';
import { Heading } from '@chakra-ui/react';
import StockSearchBar from '../../components/StockSearchBar';
import StockTableCard from '../../components/StockTableCard';
import { useStockList } from '../../contexts/useStockList';

const Home = () => {
    const { setStockList } = useStockList();

    useEffect(() => {
        setStockList();
    }, []);

    return (
        <PageTemplate>
            <Heading>Stock Market Overview</Heading>
            <StockSearchBar />
            <StockTableCard />
        </PageTemplate>
    );
};

export default Home;
