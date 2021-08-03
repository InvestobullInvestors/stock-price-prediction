import React from "react";
import {
    Avatar,
    Button,
    Grid,
    GridItem,
    HStack,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useUser } from "../../contexts/useUser";
import { Link } from "react-router-dom";

const UserProfilePopup = () => {
    const { user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem onClick={onOpen} fontWeight="bold" isTruncated>
                {user.displayName}
            </MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text>User Profile</Text>
                    </ModalHeader>
                    <ModalBody>
                        <HStack>
                            <Avatar
                                size="lg"
                                name={user.displayName}
                                src={user.photoURL}
                                m={4}
                            />
                            <Grid
                                templateColumns="repeat(4, 1fr)"
                                h={36}
                                gap={4}
                            >
                                <GridItem colSpan={1}>
                                    <Text fontWeight="bold">Name:</Text>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    {user.displayName}
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Text fontWeight="bold">Email:</Text>
                                </GridItem>
                                <GridItem colSpan={3}>{user.email}</GridItem>
                                <GridItem colSpan={1}>
                                    <Text fontWeight="bold">Plan:</Text>
                                </GridItem>
                                <GridItem colSpan={3}>{user.plan}</GridItem>
                                <GridItem colSpan={1}>
                                    <Text fontWeight="bold">Expiry:</Text>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    {user.plan_expiry ? user.plan_expiry : "-"}
                                </GridItem>
                            </Grid>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} as={Link} to="/plans">
                            Upgrade Account
                        </Button>
                    </ModalFooter>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserProfilePopup;
