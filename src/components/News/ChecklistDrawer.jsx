import React from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { BiFilterAlt } from "react-icons/bi";
import NewsChecklist from "./NewsChecklist";

const ChecklistDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <DrawerHeader borderBottomWidth="1px">Sources</DrawerHeader>
                    <DrawerBody>
                        <NewsChecklist />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ChecklistDrawer;
