import React from 'react';
import {
    Button,
    Checkbox,
    Flex,
    HStack,
    VStack,
    PopoverTrigger,
    Popover,
    PopoverContent,
} from '@chakra-ui/react';
import { useStockNews } from '../../contexts/useStockNews';
import { BiChevronsDown } from 'react-icons/bi';

const StockNewsChecklist = () => {
    const { stockListNews, selectStock, selectAllStocks, unselectAllStocks } =
        useStockNews();

    const sortedStockListNews = [...stockListNews];

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
        <Popover trigger="hover">
            <PopoverTrigger>
                <VStack align="stretch">
                    <HStack>
                        <Button onClick={() => selectAllStocks()}>
                            Check All
                        </Button>
                        <Button onClick={() => unselectAllStocks()}>
                            Uncheck All
                        </Button>
                    </HStack>
                    <VStack
                        align="start"
                        maxH="175px"
                        overflow="auto"
                        css={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            '&::-webkit-scrollbar': {
                                width: '0px',
                            },
                        }}
                    >
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
                </VStack>
            </PopoverTrigger>
            <PopoverContent
                background="transparent"
                border={0}
                shadow={0}
                mt="-25px"
            >
                <Flex justify="center">
                    <BiChevronsDown
                        size={40}
                        opacity={0.7}
                        display="inline-block"
                        w="100%"
                    />
                </Flex>
            </PopoverContent>
        </Popover>
    );
};

export default StockNewsChecklist;
