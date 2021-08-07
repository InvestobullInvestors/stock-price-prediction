import React from 'react';
import {
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Radio,
    RadioGroup,
    Stack,
    useDisclosure,
} from '@chakra-ui/react';
import { BiFilterAlt } from 'react-icons/bi';
import NewsChecklist from './NewsChecklist';
import { useStockNews } from '../../contexts/useStockNews';
import StockNewsChecklist from './StockNewsChecklist';

const ChecklistDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, setValue] = React.useState('1');
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
                        <RadioGroup onChange={setValue} value={value}>
                            <Stack direction="row">
                                <Radio
                                    value="1"
                                    onChange={() =>
                                        setDisplayWatchlistNews(false)
                                    }
                                >
                                    Sources
                                </Radio>
                                <Radio
                                    value="2"
                                    onChange={() =>
                                        setDisplayWatchlistNews(true)
                                    }
                                >
                                    Watchlist Stocks
                                </Radio>
                            </Stack>
                        </RadioGroup>
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
