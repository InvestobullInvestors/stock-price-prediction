import React from 'react';
import {Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure} from "@chakra-ui/react";

// TODO: component still WIP
const ResetPasswordPopup = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Reset Password</ModalHeader>
                <ModalBody>body</ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ResetPasswordPopup;
