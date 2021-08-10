import React from 'react';
import { Text, VStack } from '@chakra-ui/react';
import { useStockNews } from '../../contexts/useStockNews';
import { useUser } from '../../contexts/useUser';

const StockNewsChecklist = () => {
    const { user } = useUser();
    const { stockListNews } = useStockNews();

    return (
        <VStack align="stretch">
            {user
                ? stockListNews.map(({ stock_name }) => (
                      <Text>{stock_name}</Text>
                  ))
                : null}
        </VStack>
    );
};

export default StockNewsChecklist;
