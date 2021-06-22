import { Button, ButtonGroup } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

const WatchlistButton = () => {
    return (
    <Button leftIcon={<AiFillStar />} colorScheme="green" variant="solid">
        Add to watchlist
    </Button>
    )
}

export default WatchlistButton;