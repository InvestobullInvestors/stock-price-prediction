import React from 'react';
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
} from '@chakra-ui/react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ResetPasswordForm from './ResetPasswordForm';
import { useLoginSignupPopup } from '../../contexts/useLoginSignupPopup';

const LoginSignupPopup = () => {
    const { mode, setMode, isOpen, onOpen, onClose } = useLoginSignupPopup();

    const modalContent = {
        login: {
            header: 'Log In to InvestoBull',
            body: <LoginForm setMode={setMode} />,
            footer: (
                <Text>
                    Don't have an account yet?
                    <Link as="button" onClick={() => setMode('signup')} ml={2}>
                        Sign Up!
                    </Link>
                </Text>
            ),
        },
        signup: {
            header: 'Sign Up for InvestoBull',
            body: <SignupForm />,
            footer: (
                <Text>
                    Already have an account?
                    <Link as="button" onClick={() => setMode('login')} ml={2}>
                        Log In!
                    </Link>
                </Text>
            ),
        },
        resetPassword: {
            header: 'Password Reset',
            body: <ResetPasswordForm setMode={setMode} />,
            footer: (
                <Text>
                    Don't have an account yet?
                    <Link as="button" onClick={() => setMode('signup')} ml={2}>
                        Sign Up!
                    </Link>
                </Text>
            ),
        },
    };

    return (
        <>
            <Button
                display={{ base: 'none', sm: 'flex' }}
                onClick={() => {
                    setMode('login');
                    onOpen();
                }}
                variant="outline"
                mr={2}
            >
                Log In
            </Button>

            <Button
                onClick={() => {
                    setMode('signup');
                    onOpen();
                }}
            >
                Sign Up
            </Button>

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
