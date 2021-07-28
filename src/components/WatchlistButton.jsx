import {IconButton} from '@chakra-ui/react';
import {BsStar, BsStarFill} from 'react-icons/bs';
import {useEffect, useState} from 'react';
import {useUser} from "../contexts/useUser";

const WatchlistButton = ({ticker}) => {
    const [icon, setIcon] = useState(<BsStar/>);
    const [addedToWatchlist, setAddedToWatchlist] = useState(false);
    const {addToWatchlist, removeFromWatchlist, watchlist} = useUser();

    useEffect(() => {
        if (watchlist.includes(ticker)) {
            setIcon(<BsStarFill/>)
            setAddedToWatchlist(true)
        }
    }, [watchlist]);

    const handleClick = () => {
        if (addedToWatchlist) {
            setIcon(<BsStar/>);
            removeFromWatchlist(ticker)
        } else {
            setIcon(<BsStarFill/>);
            addToWatchlist(ticker)
        }
        setAddedToWatchlist(!addedToWatchlist);
    };

    return (
        <IconButton
            aria-label='watchlist-button'
            icon={icon}
            colorScheme='yellow'
            variant='ghost'
            onClick={handleClick}
        />
    );
};

export default WatchlistButton;
