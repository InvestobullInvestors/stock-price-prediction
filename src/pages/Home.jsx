import React, { useEffect, useState } from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import CustomHeading from '../components/CustomHeading';
import { VStack } from '@chakra-ui/react';
import StockSearchBar from '../components/StockTable/StockSearchBar';
import StockInfoTable from '../components/StockTable/StockInfoTable';
import { useStockSymbol } from '../contexts/useStockInfo';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
    const {
        stockInfoForTable,
        getStockInfoForTable,
        filterStocks,
        isStockInfoTableLoading,
        sortStocks,
        setStockInfoForTable,
    } = useStockSymbol();
    const [filterKeyword, setFilterKeyword] = useState();

    useEffect(() => {
        getStockInfoForTable();
    }, []);

    const handleSortClick = (key, direction) => {
        sortStocks(stockInfoForTable, key, direction, setStockInfoForTable);
    };

    const handleChange = (event) => {
        event.preventDefault();
        setFilterKeyword(event?.target?.value);
        filterStocks(event?.target?.value);
    };

    const handleCancel = (event) => {
        event.preventDefault();
        setFilterKeyword('');
        filterStocks('');
    };

    return (
        <PageTemplate>
            <VStack spacing={16}>
                <CustomHeading>Stock Market Overview</CustomHeading>
                <StockSearchBar
                    handleChange={handleChange}
                    handleCancel={handleCancel}
                    keyword={{ filterKeyword }}
                />
                {isStockInfoTableLoading ? (
                    <LoadingSpinner />
                ) : (
                    <StockInfoTable
                        stocks={stockInfoForTable}
                        handleSortClick={handleSortClick}
                    />
                )}
            </VStack>
        </PageTemplate>
    );
};

export default Home;
