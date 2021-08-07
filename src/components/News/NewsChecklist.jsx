import React from 'react';
import { Button, Checkbox, HStack, VStack } from '@chakra-ui/react';
import { useStockNews } from '../../contexts/useStockNews';

const NewsChecklist = () => {
    const {
        newsInfo,
        selectSource,
        selectAllSources,
        unselectAllSources,
    } = useStockNews();
    const sortedNewsInfo = [...newsInfo];

    // keep checklist items alphabetically sorted
    sortedNewsInfo.sort((a, b) => {
        while (a == null || b == null) {
            setTimeout(null, 1000);
        }
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
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
                <Button onClick={() => selectAllSources()}>Check All</Button>
                <Button onClick={() => unselectAllSources()}>
                    Uncheck All
                </Button>
            </HStack>
            {sortedNewsInfo.map((source) => (
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
    );
};

export default NewsChecklist;
