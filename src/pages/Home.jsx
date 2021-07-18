import React, { useEffect } from 'react';
import PageTemplate from "../components/pagetemplate/PageTemplate";
import CustomHeading from "../components/CustomHeading";
import StockSearchBar from '../components/StockSearchBar';
import StockTableCard from '../components/StockTableCard';
import { useStockList } from '../contexts/useStockList';

const Home = () => {
    const { setStockList } = useStockList();

    useEffect(() => {
        setStockList();
    }, []);

    return (
        <PageTemplate>
            <CustomHeading>Stock Market Overview</CustomHeading>
            <StockSearchBar />
            <StockTableCard />
        </PageTemplate>
    );
};

export default Home;
