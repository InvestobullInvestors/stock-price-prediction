import React, { useState } from "react";
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
    useDisclosure,
} from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ResetPasswordForm from "./ResetPasswordForm";

const LoginSignupPopup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [mode, setMode] = useState("login");

    const modalContent = {
        login: {
            header: "Log In to InvestoBull",
            body: <LoginForm setMode={setMode} />,
            footer: (
                <Text>
                    Don't have an account yet?
                    <Link as="button" onClick={() => setMode("signup")} ml={2}>
                        Sign Up!
                    </Link>
                </Text>
            ),
        },
        signup: {
            header: "Sign Up for InvestoBull",
            body: <SignupForm />,
            footer: (
                <Text>
                    Already have an account?
                    <Link as="button" onClick={() => setMode("login")} ml={2}>
                        Log In!
                    </Link>
                </Text>
            ),
        },
        resetPassword: {
            header: "Password Reset",
            body: <ResetPasswordForm setMode={setMode} />,
            footer: (
                <Text>
                    Don't have an account yet?
                    <Link as="button" onClick={() => setMode("signup")} ml={2}>
                        Sign Up!
                    </Link>
                </Text>
            ),
        },
    };

    return (
        <>
            <Button onClick={onOpen}>Login/Signup</Button>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalContent[mode].header}</ModalHeader>
                    <ModalBody>{modalContent[mode].body}</ModalBody>
                    <ModalFooter>{modalContent[mode].footer}</ModalFooter>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>
        </>
    );
};

export default LoginSignupPopup;
