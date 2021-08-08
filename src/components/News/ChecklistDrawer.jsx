import React from 'react';
import {
    Button,
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
import CustomButtonGroup from '../CustomButtonGroup';

const ChecklistDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isDisplayingWatchlistStockNews } = useStockNews();

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
                        <CustomButtonGroup />
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
