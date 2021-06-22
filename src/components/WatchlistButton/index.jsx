import { Button, ButtonGroup } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

const WatchlistButton = () => {
    return (
    <Button leftIcon={<AiFillStar />} colorScheme="green" variant="solid">
        Add to Watchlist
    </Button>
    )
}

export default WatchlistButton;