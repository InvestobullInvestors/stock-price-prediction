import React from 'react';
import {
    Button,
    ButtonGroup,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { BiFilterAlt } from 'react-icons/bi';
import NewsChecklist from './NewsChecklist';
import { useStockNews } from '../../contexts/useStockNews';
import StockNewsChecklist from './StockNewsChecklist';
import { useUser } from '../../contexts/useUser';

const ChecklistDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useUser();
    const [value, setValue] = React.useState(0);
    const {
        isDisplayingWatchlistStockNews,
        setDisplayWatchlistNews,
    } = useStockNews();

    return (
        <>
            <Button
                colorScheme="blue"
                onClick={onOpen}
                mt={5}
                ml={2}
                px={6}
                rightIcon={<BiFilterAlt />}
                minW={20}
            >
                Filter
            </Button>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <ButtonGroup isAttached colorScheme="brand">
                            <Button
                                value={0}
                                mr="-px"
                                onClick={() => {
                                    setValue(0);
                                    setDisplayWatchlistNews(false);
                                }}
                                opacity={value === 0 ? '1' : '0.5'}
                            >
                                Sources
                            </Button>
                            <Button
                                value={1}
                                mr="-px"
                                onClick={() => {
                                    setValue(1);
                                    setDisplayWatchlistNews(true);
                                }}
                                opacity={value === 1 ? '1' : '0.5'}
                                isDisabled={!user}
                            >
                                Watchlist Stocks
                            </Button>
                        </ButtonGroup>
                    </DrawerHeader>
                    <Divider orientation="horizontal" mb={3} />
                    <DrawerBody>
                        {isDisplayingWatchlistStockNews ? (
                            <StockNewsChecklist />
                        ) : (
                            <NewsChecklist />
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ChecklistDrawer;
