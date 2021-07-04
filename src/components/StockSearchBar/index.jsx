import {
    Stack,
    InputGroup,
    InputLeftElement,
    Input,
    Box,
    useColorModeValue,
    Button,
    InputRightElement,
} from '@chakra-ui/react';
import { GoSearch } from 'react-icons/go';
import { useState } from 'react';

const StockSearchBar = () => {
    const boxColor = useColorModeValue('brand.100', 'brand.700');
    const [value, setValue] = useState('');
    const color = useColorModeValue('blue', 'gray');

    const handleChange = (event) => setValue(event.target.value);

    const handleClick = () => {};

    return (
        <Box
            mx={3}
            mt={5}
            px={4}
            py={10}
            borderRadius='lg'
            shadow='md'
            bg={boxColor}
        >
            <Stack direction='row' spacing={4}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none' />
                    <Input
                        value={value}
                        onChange={handleChange}
                        placeholder='Search for symbol'
                    />
                    <InputRightElement width='5rem'>
                        <Button
                            h='1.75rem'
                            size='lg'
                            variant='solid'
                            colorScheme={color}
                            onClick={handleClick}
                        >
                            {<GoSearch color='white' />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Stack>
        </Box>
    );
};

export default StockSearchBar;
