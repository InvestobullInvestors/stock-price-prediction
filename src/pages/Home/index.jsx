import React from 'react';
import PageTemplate from "../../components/PageLayout/PageTemplate";
import StockTable from '../../components/StockTable/StockTable';
import {Heading} from "@chakra-ui/react";

const Home = () => (
    <PageTemplate>
        <Heading>Home</Heading>
        <StockTable/>
    </PageTemplate>
)

export default Home;
