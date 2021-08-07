import React from 'react';
import { Button, Checkbox, HStack, Text, VStack } from '@chakra-ui/react';
import { useStockNews } from '../../contexts/useStockNews';

const StockNewsChecklist = () => {
    const {
        stockListNews,
        selectStock,
        selectAllStocks,
        unselectAllStocks,
    } = useStockNews();

    const sortedStockListNews = [...stockListNews];

    // keep checklist items alphabetically sorted
    sortedStockListNews.sort((a, b) => {
        while (a == null || b == null) {
            setTimeout(null, 1000);
        }
        const nameA = a.stock_name.toUpperCase();
        const nameB = b.stock_name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    return (
        <VStack align="stretch">
            <HStack>
                <Button onClick={() => selectAllStocks()}>Check All</Button>
                <Button onClick={() => unselectAllStocks()}>Uncheck All</Button>
            </HStack>
            {sortedStockListNews.map((stock) => (
                <Checkbox
                    key={stock.ticker_id}
                    value={stock.stock_name}
                    isChecked={stock.selected}
                    onChange={(e) => selectStock(stock)}
                >
                    {stock.stock_name}
                </Checkbox>
            ))}
        </VStack>
    );
};

export default StockNewsChecklist;
