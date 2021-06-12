import React from 'react';
import {SimpleGrid} from '@chakra-ui/react';
import NewsCard from "../NewsCard";

const NewsGrid = () => (
    <SimpleGrid columns={{base: 1, sm: 2, md: 3, lg: 4}} spacing={3}>
        <NewsCard source="Bloomberg"/>
        <NewsCard source="Financial Post"/>
        <NewsCard source="Financial Times"/>
        <NewsCard source="The Economist"/>
        <NewsCard source="The Global and Mail"/>
        <NewsCard source="The New York Times"/>
        <NewsCard source="The Wall Street Journal"/>
        <NewsCard source="Time"/>
    </SimpleGrid>
)

export default NewsGrid;
