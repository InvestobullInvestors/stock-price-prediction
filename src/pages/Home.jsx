import React, { useEffect } from 'react';
import PageTemplate from "../components/PageTemplate/PageTemplate";
import CustomHeading from "../components/CustomHeading";
import StockSearchBar from '../components/StockTable/StockSearchBar';
import StockTableCard from '../components/StockTable/StockTableCard';
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
