import { Stack, InputGroup, InputLeftElement, Input, Button, ButtonGroup } from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";

const SearchBar = () => {

    return (
        <Stack direction="row" spacing={4}>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<GoSearch color="gray.300" />} />
                <Input placeholder="Search for symbol" />
            </InputGroup>
        </Stack>
    )
}

export default SearchBar;