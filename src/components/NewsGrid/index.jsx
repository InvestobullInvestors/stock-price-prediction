import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import NewsCard from '../NewsCard';
import { useStockNews } from '../../contexts/useStockNews';

const NewsGrid = () => {
    const { allNewsSources } = useStockNews();

    return (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
            {allNewsSources.map((newsSource) => (
                <NewsCard key={newsSource} source={newsSource} />
            ))}
        </SimpleGrid>
    );
};

export default NewsGrid;
