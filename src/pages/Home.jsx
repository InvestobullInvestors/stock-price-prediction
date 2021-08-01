import React, {useState} from 'react';
import PageTemplate from "../components/PageTemplate/PageTemplate";
import CustomHeading from "../components/CustomHeading";
import {VStack} from "@chakra-ui/react";
import StockSearchBar from "../components/StockTable/StockSearchBar";
import StockInfoTable from "../components/StockTable/StockInfoTable";
import {useStockSymbol} from "../contexts/useStockInfo";

const Home = () => {
    const {basicStockInfo, filterStocks, sortStocks, setBasicStockInfo} = useStockSymbol()
    const [filterKeyword, setFilterKeyword] = useState()

    const handleSortClick = key => {
        sortStocks(basicStockInfo, key, setBasicStockInfo)
    }

    const handleChange = (event) => {
        event.preventDefault();
        setFilterKeyword(event?.target?.value)
        filterStocks(event?.target?.value)
    }

    const handleCancel = event => {
        event.preventDefault()
        setFilterKeyword('')
        filterStocks('')
    }

    return (
        <PageTemplate>
            <VStack spacing={16} m={4}>
                <CustomHeading>Stock Market Overview</CustomHeading>
                <StockSearchBar handleChange={handleChange} handleCancel={handleCancel} keyword={{filterKeyword}}/>
                <StockInfoTable stocks={basicStockInfo} handleSortClick={handleSortClick}/>
            </VStack>
        </PageTemplate>
    )
};

export default Home;
