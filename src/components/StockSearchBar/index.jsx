import { HStack, Box, useColorModeValue, Container } from '@chakra-ui/react';
import { IoSearch, IoClose } from 'react-icons/io5';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import MoonLoader from 'react-spinners/MoonLoader';
import useDebounce from '../../hooks/debounceHook';
import axios from 'axios';
import ShowStock from './ShowStock';

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
        height: '20em',
    },
    collapsed: {
        height: '3.8em',
    },
};

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };

const StockSearchBar = (props) => {
    const [isExpanded, setExpanded] = useState(false);
    const [parentRef, isClickedOutside] = useClickOutside();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [noStocksFound, setNoStocksFound] = useState(false);
    const isEmpty = !stocks || stocks.length === 0;
    const inputRef = useRef();
    const boxColor = useColorModeValue('brand.100', 'brand.700');
    const color = useColorModeValue('#000', '#fff');

    const expandContainer = () => {
        setExpanded(true);
    };

    const collapseContainer = () => {
        setExpanded(false);
        setSearchQuery('');
        setLoading(false);
        setNoStocksFound(false);
        setStocks([]);
        if (inputRef.current) inputRef.current.value = '';
    };

    const changeHandler = (event) => {
        event.preventDefault();
        if (event.target.value.trim() === '') {
            setNoStocksFound(false);
            setStocks([]); // show empty results when search field is blank
        }
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        if (isClickedOutside) collapseContainer();
    }, [isClickedOutside]);

    const prepareSearchQuery = (query) => {
        const url = `https://ticker-2e1ica8b9.now.sh/keyword/${query}`;
        return encodeURI(url);
    };

    const searchStock = async () => {
        if (!searchQuery || searchQuery.trim() === '') return;
        setNoStocksFound(false);
        setLoading(true);
        const URL = prepareSearchQuery(searchQuery);
        console.log('URL: ', URL);
        const res = await axios.get(URL).catch((err) => {
            console.log('Error: ', err);
        });
        if (res) {
            if (res.data && res.data.length === 0) setNoStocksFound(true);
            setStocks(res.data);
        }
        setLoading(false);
    };

    useDebounce(searchQuery, 500, searchStock); // call api endpoint after 500 ms of no user input

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
            <HStack>
                <Container centerContent maxW='container.lg'>
                    <SearchBarContainer
                        animate={isExpanded ? 'expanded' : 'collapsed'}
                        variants={containerVariants}
                        transition={containerTransition}
                        ref={parentRef}
                    >
                        <SearchInputContainer>
                            <SearchIcon>
                                <IoSearch />
                            </SearchIcon>
                            <SearchInput
                                placeholder='Search for stock'
                                onFocus={expandContainer}
                                ref={inputRef}
                                value={searchQuery}
                                onChange={changeHandler}
                            />
                            <AnimatePresence>
                                {isExpanded && (
                                    <CloseIcon
                                        key='close-icon'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        onClick={collapseContainer}
                                    >
                                        <IoClose />
                                    </CloseIcon>
                                )}
                            </AnimatePresence>
                        </SearchInputContainer>
                        {isExpanded && <LineSeperator />}
                        {isExpanded && (
                            <SearchContent>
                                {isLoading && (
                                    <LoadingWrapper>
                                        <MoonLoader
                                            loading={true}
                                            color={color}
                                            size={20}
                                        />
                                    </LoadingWrapper>
                                )}
                                {!isLoading && noStocksFound && (
                                    <LoadingWrapper>
                                        <WarningMessage>
                                            No Stocks Found!
                                        </WarningMessage>
                                    </LoadingWrapper>
                                )}
                                {!isLoading && !isEmpty && (
                                    <>
                                        {stocks.map((stock) => (
                                            <ShowStock
                                                key={stock.symbol}
                                                symbol={stock.symbol}
                                                name={stock.name}
                                            />
                                        ))}
                                    </>
                                )}
                            </SearchContent>
                        )}
                    </SearchBarContainer>
                </Container>
            </HStack>
        </Box>
    );
};

export default StockSearchBar;
