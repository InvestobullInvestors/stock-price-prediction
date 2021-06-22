import React from 'react';
import PageTemplate from "../../components/PageTemplate";
import StockTable from '../../components/StockTable';
import {Heading} from "@chakra-ui/react";
import StockSymbol from '../../components/StockSymbol';
import WatchlistButton from '../../components/WatchlistButton';
import SearchBar from '../../components/SearchBar';

const Home = () => (
    <PageTemplate>
        <Heading>Home</Heading>
        <StockSymbol/>
        <WatchlistButton/>
        <SearchBar/>
        <StockTable/>
    </PageTemplate>
)

export default Home;
