import { Button, useColorModeValue } from '@chakra-ui/react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useState } from 'react';

const WatchlistButton = () => {
    const [icon, setIcon] = useState(<BsStar />);
    const [iconClicked, setIconClicked] = useState(true);
    const color = useColorModeValue('yellow', 'orange');

    const handleClick = () => {
        if (iconClicked) {
            // Add to watchlist
            setIcon(<BsStarFill />);
            setIconClicked(!iconClicked);
        } else {
            // Remove from watchlist
            setIcon(<BsStar />);
            setIconClicked(!iconClicked);
        }
    };

    return (
        <Button
            leftIcon={icon}
            colorScheme={color}
            variant='outline'
            onClick={handleClick}
        />
    );
};

export default WatchlistButton;
