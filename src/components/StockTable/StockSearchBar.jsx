import React from "react";
import {CloseIcon, SearchIcon} from "@chakra-ui/icons";
import {Input, InputGroup, InputLeftElement, InputRightElement, useColorModeValue} from "@chakra-ui/react";


const StockSearchBar = ({handleChange, handleCancel, keyword: {filterKeyword}}) => {
    return (
        <InputGroup w='40%' borderRadius='lg' border='1px' borderColor={useColorModeValue('brand.200', 'brand.600')}>
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color={useColorModeValue('brand.400', 'brand.600')}/>}
            />
            <Input placeholder="Stock Ticker" onChange={handleChange} value={filterKeyword}/>
            <InputRightElement children={<CloseIcon color={useColorModeValue('brand.400', 'brand.600')} onClick={handleCancel}/>}/>
        </InputGroup>
    )
}

export default StockSearchBar;
