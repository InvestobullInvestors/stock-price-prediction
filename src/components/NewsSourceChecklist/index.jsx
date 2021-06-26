import React from 'react';
import {
    Checkbox,
    VStack,
    HStack,
    Text,
    Spacer,
    Button
} from "@chakra-ui/react"

import {CheckIcon} from "@chakra-ui/icons"
import {useStockNews} from "../../contexts/useStockNews";

const Source = ({title}) => {
    return (
        <HStack>
            <Text>{title}</Text>
            <Spacer />
            <CheckIcon />
        </HStack>
    )
}

const NewsSourceChecklist = () => {
    const {allNewsSources} = useStockNews();

    return (
        <>
            <VStack align="stretch">
                <HStack>
                    <Button>Check All</Button>
                    <Button>Uncheck All</Button>
                </HStack>
                {allNewsSources.map((newsSource) => (
                    <Checkbox key={newsSource} value={newsSource} defaultIsChecked>
                        {newsSource}
                    </Checkbox>
                ))}
            </VStack>
        </>
    )
}

export default NewsSourceChecklist;