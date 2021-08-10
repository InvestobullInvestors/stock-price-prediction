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
    };

    useEffect(() => {
        setSliderValue(predictedValue);
    }, []);

    return (
        <VStack my={8} mx={4} spacing={4}>
            <Text
                fontSize="xl"
                color={useColorModeValue('gray.300', 'brand.700')}
            >
                {tag}
            </Text>
            <NumberInput
                isDisabled
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
                isDisabled
                aria-label="slider"
                value={sliderValue}
                focusThumbOnChange={false}
                onChange={handleChange}
                maxW={80}
            >
                <SliderTrack bg={useColorModeValue('brand.200', 'brand.900')}>
                    <SliderFilledTrack
                        bg={useColorModeValue('brand.300', 'brand.700')}
                    />
                </SliderTrack>
                <SliderThumb
                    boxSize={6}
                    bgColor={useColorModeValue('brand.300', 'brand.700')}
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
