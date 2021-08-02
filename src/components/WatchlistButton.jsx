import { IconButton } from "@chakra-ui/react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/useUser";

const WatchlistButton = ({ ticker }) => {
    const [icon, setIcon] = useState(<BsStar />);
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const { addToWatchlist, removeFromWatchlist, watchlist, user } = useUser();

    useEffect(() => {
        const tickers = [];
        watchlist.forEach(({ ticker }) => tickers.push(ticker));
        if (tickers.includes(ticker)) {
            setIcon(<BsStarFill />);
            setIsWatchlisted(true);
        }
    }, [watchlist]);

    const handleClick = () => {
        if (!user) return; // TODO: trigger sign in popup

        if (isWatchlisted) {
            setIcon(<BsStar />);
            removeFromWatchlist(ticker);
        } else {
            setIcon(<BsStarFill />);
            addToWatchlist(ticker);
        }
        setIsWatchlisted(!isWatchlisted);
    };

    return (
        <IconButton
            aria-label="watchlist-button"
            icon={icon}
            colorScheme="yellow"
            variant="ghost"
            onClick={handleClick}
        />
    );
};

export default WatchlistButton;
