import React from 'react';
import { Flex, List, Spacer } from '@chakra-ui/react';

import { useStockNews } from '../../contexts/useStockNews';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CloseIcon, DragHandleIcon } from '@chakra-ui/icons';
import StockNewsCard from './StockNewsCard';

const StockNewsCardList = () => {
    const { stockListNews, reorderStocks, selectSource } = useStockNews();
    const staticCheckListWidth = '300px';

    let visibleStockNewsCards = stockListNews.filter(
        (stock) => stock.selected === true
    );

    return (
        <DragDropContext
            onDragEnd={(result) => {
                const { source, destination } = result;
                if (!destination) {
                    return;
                }
                if (
                    source.index === destination.index &&
                    source.droppableId === destination.droppableId
                ) {
                    return;
                }
                reorderStocks(source.index, destination.index);
            }}
        >
            <Droppable droppableId="newsGrid">
                {(droppableProvided) => (
                    <div
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                    >
                        <List
                            spacing={3}
                            ml={['0px', '0px', '0px', staticCheckListWidth]}
                            mr={5}
                            width={[
                                '100%',
                                '100%',
                                '100%',
                                'calc(100% - ' + staticCheckListWidth + ')',
                            ]}
                        >
                            {visibleStockNewsCards.map((stock, index) => (
                                <Draggable
                                    key={stock.ticker_id}
                                    draggableId={stock.ticker_id}
                                    index={index}
                                >
                                    {(draggableProvided) => (
                                        <div
                                            {...draggableProvided.draggableProps}
                                            ref={draggableProvided.innerRef}
                                        >
                                            <StockNewsCard
                                                key={stock.ticker_id}
                                                stock={stock}
                                            >
                                                <Flex>
                                                    <div
                                                        {...draggableProvided.dragHandleProps}
                                                        style={{
                                                            marginTop: '-6px',
                                                        }}
                                                    >
                                                        <DragHandleIcon
                                                            w={5}
                                                            h={5}
                                                        />
                                                    </div>
                                                    <Spacer />
                                                    <CloseIcon
                                                        cursor={'pointer'}
                                                        onClick={() =>
                                                            selectSource(stock)
                                                        }
                                                        w={5}
                                                        h={5}
                                                    />
                                                </Flex>
                                            </StockNewsCard>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </List>
                        {droppableProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default StockNewsCardList;
