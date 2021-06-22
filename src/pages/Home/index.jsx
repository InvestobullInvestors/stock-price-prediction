import React from 'react';
import PageTemplate from "../../components/PageTemplate";
import StockTable from '../../components/StockTable';
import {Heading} from "@chakra-ui/react";
import StockSymbol from '../../components/StockSymbol';
import WatchlistButton from '../../components/WatchlistButton';
import SearchBar from '../../components/SearchBar';
import StockTableCard from '../../components/StockTableCard';

const Home = () => (
    <PageTemplate>
        <Heading>Home</Heading>
        <StockTableCard/>
    </PageTemplate>
)

export default Home;
