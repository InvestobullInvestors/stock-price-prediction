import React from 'react';
import { Flex, List, Spacer } from '@chakra-ui/react';
import NewsCard from './NewsCard';

import { useStockNews } from '../../contexts/useStockNews';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CloseIcon, DragHandleIcon } from '@chakra-ui/icons';

const NewsCardList = () => {
    const { newsInfo, reorderSources, selectSource } = useStockNews();
    const staticCheckListWidth = '300px';

    let visibleNewsCards = newsInfo.filter(
        (source) => source.selected === true
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
                reorderSources(source.index, destination.index);
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
                            {visibleNewsCards.map((source, index) => (
                                <Draggable
                                    key={source.id}
                                    draggableId={source.id}
                                    index={index}
                                >
                                    {(draggableProvided) => (
                                        <div
                                            {...draggableProvided.draggableProps}
                                            ref={draggableProvided.innerRef}
                                        >
                                            <NewsCard
                                                key={source.id}
                                                source={source}
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
                                                            selectSource(source)
                                                        }
                                                        w={5}
                                                        h={5}
                                                    />
                                                </Flex>
                                            </NewsCard>
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

export default NewsCardList;
