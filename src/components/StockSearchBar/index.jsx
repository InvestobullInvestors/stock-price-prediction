import {
    Stack,
    InputGroup,
    InputLeftElement,
    Input,
    Box,
    useColorModeValue,
    Button,
    InputRightElement,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { GoSearch } from 'react-icons/go';

const StockSearchBar = () => {
    const searchOptions = ['TSLA', 'BB', 'AMC', 'CLOV', 'U', 'FB'];
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
                    <AutoComplete rollNavigation>
                        <InputGroup>
                            <AutoCompleteInput
                                variant='filled'
                                placeholder='Search for symbol'
                                defaultValue=''
                                autoFocus
                                textAlign='left'
                                width='1000px'
                            />
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
                        <AutoCompleteList>
                            {searchOptions.map((option, oid) => (
                                <AutoCompleteItem
                                    key={`option-${oid}`}
                                    value={option}
                                    textTransform='capitalize'
                                >
                                    {option}
                                </AutoCompleteItem>
                            ))}
                        </AutoCompleteList>
                    </AutoComplete>
                </InputGroup>
            </Stack>
        </Box>
    );
};

export default StockSearchBar;
