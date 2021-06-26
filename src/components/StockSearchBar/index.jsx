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

const StockSearchBar = () => {
    const boxColor = useColorModeValue('brand.100', 'brand.700');

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
                    <Input placeholder='Search for symbol' />
                    <InputRightElement width='5rem'>
                        <Button
                            h='1.75rem'
                            size='lg'
                            variant='solid'
                            colorScheme='blue'
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
