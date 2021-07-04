import React from 'react';
import {SimpleGrid} from '@chakra-ui/react';
import NewsCard from "../NewsCard";
import {useStockNews} from "../../hooks/useStockNews";
import {Droppable, Draggable} from "react-beautiful-dnd"

const NewsGrid = () => {

    const {allNewsSources} = useStockNews();

    return (
        <Droppable droppableId="newsGrid">
            {(droppableProvided) => (
                <SimpleGrid
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    columns={{base: 1, sm: 2, md: 3, lg: 4}}
                    spacing={3}>
                    {
                        allNewsSources.map((newsSource, index) => (
                            <Draggable key={newsSource} draggableId={newsSource} index={index}>
                                {(draggableProvided) => (
                                    <NewsCard
                                        {...draggableProvided.draggableProps}
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.dragHandleProps}
                                        key={newsSource}
                                        source={newsSource}/>
                                )}
                            </Draggable>
                        ))}
                    {droppableProvided.placeholder}
                </SimpleGrid>
            )}
        </Droppable>
    )
}

export default NewsGrid;
