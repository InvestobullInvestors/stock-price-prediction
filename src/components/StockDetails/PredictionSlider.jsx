import React, { useEffect, useState } from 'react';
import {
    Box,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { MdGraphicEq } from 'react-icons/all';

const PredictionSlider = ({ predictedValue, tag, ...otherProps }) => {
    const [sliderValue, setSliderValue] = useState(0);

    const handleChange = (val) => {
        setSliderValue(val);
        // TODO: update prediction
    };

    useEffect(() => {
        setSliderValue(predictedValue);
    }, []);

    return (
        <VStack my={8} mx={4} spacing={4}>
            <Text fontSize="xl">{tag}</Text>
            <NumberInput
                min={0}
                value={sliderValue}
                onChange={handleChange}
                maxW={20}
                {...otherProps}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Slider
                aria-label="slider"
                value={sliderValue}
                focusThumbOnChange={false}
                onChange={handleChange}
                maxW={80}
            >
                <SliderTrack bg={useColorModeValue('brand.200', 'brand.700')}>
                    <SliderFilledTrack
                        bg={useColorModeValue('brand.400', 'brand.500')}
                    />
                </SliderTrack>
                <SliderThumb
                    boxSize={6}
                    bgColor={useColorModeValue('brand.400', 'brand.500')}
                >
                    <Box
                        color={useColorModeValue('brand.100', 'brand.900')}
                        as={MdGraphicEq}
                    />
                </SliderThumb>
            </Slider>
        </VStack>
    );
};

export default PredictionSlider;
