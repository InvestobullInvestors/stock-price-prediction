import React from "react";
import {
    Box,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    VStack,
} from "@chakra-ui/react";
import { MdGraphicEq } from "react-icons/all";

const PredictionSlider = ({ value, tag, ...otherProps }) => {
    let predictedVal = 0;
    if (value) {
        predictedVal = value;
    }

    return (
        <VStack my={8} mx={4} spacing={4}>
            <Heading as="h4" size="md">
                {tag}
            </Heading>
            <NumberInput
                isDisabled
                value={predictedVal}
                min={0}
                maxW="40%"
                {...otherProps}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Slider isDisabled aria-label="slider-ex-4" value={predictedVal}>
                <SliderTrack bg="red.100">
                    <SliderFilledTrack bg="tomato" />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                    <Box color="tomato" as={MdGraphicEq} />
                </SliderThumb>
            </Slider>
        </VStack>
    );
};

export default PredictionSlider;
