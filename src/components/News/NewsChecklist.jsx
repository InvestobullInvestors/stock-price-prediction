import React from "react";
import { Button, Checkbox, HStack, VStack } from "@chakra-ui/react";
import { useStockNews } from "../../contexts/useStockNews";

const NewsChecklist = () => {
    const { newsSelections } = useStockNews();
    const { selectSource } = useStockNews();
    const { selectAllSources } = useStockNews();
    const { unselectAllSources } = useStockNews();

    return (
        <>
            <VStack align="stretch">
                <HStack>
                    <Button onClick={() => selectAllSources()}>
                        Check All
                    </Button>
                    <Button onClick={() => unselectAllSources()}>
                        Uncheck All
                    </Button>
                </HStack>
                {newsSelections.map((source) => (
                    <Checkbox
                        key={source.id}
                        value={source.name}
                        isChecked={source.selected}
                        onChange={(e) => selectSource(source)}
                    >
                        {source.name}
                    </Checkbox>
                ))}
            </VStack>
        </>
    );
};

export default NewsChecklist;
