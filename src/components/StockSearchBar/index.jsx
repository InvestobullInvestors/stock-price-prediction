import {
    HStack,
    InputGroup,
    InputLeftElement,
    Input,
    Box,
    useColorModeValue,
    Button,
    InputRightElement,
    Container,
} from '@chakra-ui/react';
import { GoSearch } from 'react-icons/go';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

// const StockSearchBar = () => {
//     const boxColor = useColorModeValue('brand.100', 'brand.700');
//     const [value, setValue] = useState('');
//     const color = useColorModeValue('blue', 'gray');

//     const handleChange = (event) => setValue(event.target.value);

//     const handleClick = () => {};

const SearchBarContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 34em;
    height: 3.8em;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

const SearchInputContainer = styled.div`
    width: 100%;
    min-height: 4em;
    display: flex;
    align-items: center;
    position: relative;
    padding: 2px 15px;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 21px;
    color: #12112e;
    font-weight: 500;
    border-radius: 6px;
    background-color: transparent;
    &:focus {
        outline: none;
        &::placeholder {
            opacity: 0;
        }
    }
    &::placeholder {
        color: #bebebe;
        transition: all 250ms ease-in-out;
    }
`;

const SearchIcon = styled.span`
    color: #bebebe;
    font-size: 27px;
    margin-right: 10px;
    margin-top: 6px;
    vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
    color: #bebebe;
    font-size: 23px;
    vertical-align: middle;
    transition: all 200ms ease-in-out;
    cursor: pointer;
    &:hover {
        color: #dfdfdf;
    }
`;

const LineSeperator = styled.span`
    display: flex;
    min-width: 100%;
    min-height: 2px;
    background-color: #d8d8d878;
`;

const SearchContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1em;
    overflow-y: auto;
`;

const LoadingWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const WarningMessage = styled.span`
    color: #a1a1a1;
    font-size: 14px;
    display: flex;
    align-self: center;
    justify-self: center;
`;

const containerVariants = {
    expanded: {
        height: '30em',
    },
    collapsed: {
        height: '3.8em',
    },
};

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };

const StockSearchBar = () => {
    return <div></div>;

    // return (
    //     <Box
    //         mx={3}
    //         mt={5}
    //         px={4}
    //         py={10}
    //         borderRadius='lg'
    //         shadow='md'
    //         bg={boxColor}
    //     >
    //         <HStack>
    //             <Container centerContent maxW='container.lg'>
    //                 <InputGroup>
    //                     <InputLeftElement pointerEvents='none' />
    //                     <Input
    //                         value={value}
    //                         onChange={handleChange}
    //                         placeholder='Search for symbol'
    //                     />
    //                     <InputRightElement width='5rem'>
    //                         <Button
    //                             h='1.75rem'
    //                             size='lg'
    //                             variant='solid'
    //                             colorScheme={color}
    //                             onClick={handleClick}
    //                         >
    //                             {<GoSearch color='white' />}
    //                         </Button>
    //                     </InputRightElement>
    //                 </InputGroup>
    //             </Container>
    //         </HStack>
    //     </Box>
    // );
};

export default StockSearchBar;
