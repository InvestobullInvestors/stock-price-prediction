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
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import ResetPasswordForm from "../ResetPasswordForm";

const LoginSignupPopup = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const [mode, setMode] = useState("login")

    return (
        <>
            <Button onClick={onOpen}>Login/Signup</Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        {mode === "login" ? <Text>Log In to InvestoBull</Text>
                            : mode === "signup" ? <Text>Sign Up for InvestoBull</Text>
                                : <Text>Password Reset</Text>}
                    </ModalHeader>
                    <ModalBody>
                        {mode === "login" ? <LoginForm setMode={setMode}/>
                            : mode === "signup" ? <SignupForm/>
                                : <ResetPasswordForm setMode={setMode}/>}
                    </ModalBody>
                    <ModalFooter>
                        {mode === "signup" ?
                            <Text>Already have an account?
                                <Link as="button" onClick={() => setMode("login")} ml={2}>Log In!</Link>
                            </Text>
                            :
                            <Text>Don't have an account yet?
                                <Link as="button" onClick={() => setMode("signup")} ml={2}>Sign Up!</Link>
                            </Text>
                        }
                    </ModalFooter>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>
        </>
    )
}

export default LoginSignupPopup;
