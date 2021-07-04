import { Button, ButtonGroup } from '@chakra-ui/react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useState } from 'react';

const WatchlistButton = () => {
    const [icon, setIcon] = useState(<BsStar />);
    const [iconClicked, setIconClicked] = useState(true);

    const handleClick = () => {
        if (iconClicked) {
            setIcon(<BsStarFill />);
            setIconClicked(!iconClicked);
            console.log('Addded to watchlist');
        } else {
            setIcon(<BsStar />);
            setIconClicked(!iconClicked);
            console.log('Removed from watchlist');
        }
    };

    return (
        <Button
            leftIcon={icon}
            colorScheme='yellow'
            variant='outline'
            onClick={handleClick}
        />
    );
};

export default WatchlistButton;
