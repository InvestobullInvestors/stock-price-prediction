import React from "react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useColorModeValue,
} from "@chakra-ui/react";

const StockSearchBar = ({
    handleChange,
    handleCancel,
    keyword: { filterKeyword },
}) => {
    const color = useColorModeValue("brand.400", "brand.600");

    return (
        <InputGroup w="sm" borderRadius="lg" border="1px" borderColor={color}>
            <InputLeftElement pointerEvents="none">
                <SearchIcon color={color} />
            </InputLeftElement>
            <Input
                placeholder="Stock Ticker"
                onChange={handleChange}
                value={filterKeyword}
            />
            <InputRightElement>
                <CloseIcon
                    color={color}
                    _hover={{ cursor: "pointer" }}
                    onClick={handleCancel}
                />
            </InputRightElement>
        </InputGroup>
    );
};

export default StockSearchBar;
