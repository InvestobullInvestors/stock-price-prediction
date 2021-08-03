import React from "react";
import { Flex, List, Spacer } from "@chakra-ui/react";
import NewsCard from "./NewsCard";

import { useStockNews } from "../../contexts/useStockNews";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CloseIcon, DragHandleIcon } from "@chakra-ui/icons";

const NewsCardList = () => {
    const { newsSelections } = useStockNews();
    const { reorderNews } = useStockNews();
    const { selectSource } = useStockNews();

    let visibleNewsCards = newsSelections.filter(
        (source) => source.selected === true
    );

    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

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
                reorderNews(
                    reorder(newsSelections, source.index, destination.index)
                );
            }}
        >
            <Droppable droppableId="newsGrid">
                {(droppableProvided) => (
                    <div
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                    >
                        <List spacing={3} mr={5}>
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
                                                            marginTop: "-6px",
                                                        }}
                                                    >
                                                        <DragHandleIcon
                                                            w={5}
                                                            h={5}
                                                        />
                                                    </div>
                                                    <Spacer />
                                                    <CloseIcon
                                                        cursor={"pointer"}
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
