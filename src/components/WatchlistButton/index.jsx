import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useState } from 'react';

const WatchlistButton = ({ symbol }) => {
    const [icon, setIcon] = useState(<BsStar />);
    const [iconClicked, setIconClicked] = useState(true);
    const yellowColorScheme = useColorModeValue('yellow', 'orange');

    const handleClick = () => {
        if (iconClicked) {
            // Add to watchlist
            setIcon(<BsStarFill />);
            setIconClicked(!iconClicked);
            console.log('Added stock to watchlist: ', { symbol });
        } else {
            // Remove from watchlist
            setIcon(<BsStar />);
            setIconClicked(!iconClicked);
            console.log('Removed stock from watchlist: ', { symbol });
        }
    };

    return (
        <IconButton
            icon={icon}
            colorScheme={yellowColorScheme}
            variant='ghost'
            onClick={handleClick}
        />
    );
};

export default WatchlistButton;
