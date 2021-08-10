import React from 'react';
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
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { useUser } from '../../contexts/useUser';
import { Link } from 'react-router-dom';

const UserProfileBody = ({
    user: { displayName, email, photoURL, plan, plan_expiry },
}) => (
    <HStack>
        <Avatar size="lg" name={displayName} src={photoURL} m={3} />
        <Grid templateColumns="repeat(4, 1fr)" minH={36} gap={2}>
            <GridItem colSpan={1}>
                <Text fontWeight="bold">Name:</Text>
            </GridItem>
            <GridItem colSpan={3}>{displayName}</GridItem>
            <GridItem colSpan={1}>
                <Text fontWeight="bold">Email:</Text>
            </GridItem>
            <GridItem colSpan={3}>{email}</GridItem>
            <GridItem colSpan={1}>
                <Text fontWeight="bold">Plan:</Text>
            </GridItem>
            <GridItem colSpan={3}>{plan}</GridItem>
            <GridItem colSpan={1}>
                <Text fontWeight="bold">Expiry:</Text>
            </GridItem>
            <GridItem colSpan={3}>{plan_expiry ?? '-'}</GridItem>
        </Grid>
    </HStack>
);

const UserProfilePopup = () => {
    const { user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem onClick={onOpen}>Profile</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    bgColor={useColorModeValue('brand.50', 'brand.800')}
                >
                    <ModalHeader>
                        <Text>User Profile</Text>
                    </ModalHeader>
                    <ModalBody>
                        <UserProfileBody user={user} />
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
