import React, {useState} from 'react';
import {
    Button,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const LoginPopup = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const [hasAccount, setHasAccount] = useState(true)

    return (
        <>
            <Button onClick={onOpen}>Login/Signup</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        {hasAccount ? <Text>Log In to InvestoBull</Text> : <Text>Sign Up for InvestoBull</Text>}
                    </ModalHeader>
                    <ModalBody>
                        {hasAccount ?
                            <LoginForm/> :
                            <SignupForm/>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {hasAccount ?
                            <Text>Don't have an account yet?
                                <Link as="button" onClick={() => setHasAccount(false)} ml={2}>Sign Up!</Link>
                            </Text>
                            :
                            <Text>Already have an account?
                                <Link as="button" onClick={() => setHasAccount(true)} ml={2}>Log In!</Link>
                            </Text>
                        }
                    </ModalFooter>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>
        </>
    )
}

export default LoginPopup;
