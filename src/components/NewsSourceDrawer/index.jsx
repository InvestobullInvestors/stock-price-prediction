import React from 'react';
import {
    Drawer,
    Button,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    HStack,
    Text,
    Spacer,
    Divider,
} from "@chakra-ui/react"

import {CheckIcon} from "@chakra-ui/icons"

const Source = ({title}) => {
    return (
        <HStack>
            <Text>{title}</Text>
            <Spacer />
            <CheckIcon />
        </HStack>
    )
}

const NewsSourceDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button colorScheme="blue" onClick={onOpen} mt={7}>
                sources
            </Button>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Sources</DrawerHeader>
                    <DrawerBody>
                        <Source title={"The New York Times"}/>
                        <Divider my={3} variant="dashed"/>
                        <Source title={"Time"}/>
                        <Divider my={3} variant="dashed"/>
                        <Source title={"The Economist"}/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default NewsSourceDrawer;