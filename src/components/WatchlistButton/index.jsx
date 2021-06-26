import { Button, ButtonGroup } from "@chakra-ui/react";
import { BsStar } from "react-icons/bs";

const WatchlistButton = () => {
    return (
    <Button leftIcon={<BsStar/>} colorScheme="green" variant="outline"/>
    )
}

export default WatchlistButton;