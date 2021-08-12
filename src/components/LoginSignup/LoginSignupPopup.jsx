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
    useColorModeValue,
} from '@chakra-ui/react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ResetPasswordForm from './ResetPasswordForm';
import { useLoginSignupPopup } from '../../contexts/useLoginSignupPopup';

const LoginSignupPopup = () => {
    const { mode, setMode, isOpen, onOpen, onClose } = useLoginSignupPopup();
    const hoverColor = useColorModeValue('brand.600', 'brand.400');
    const blueColor = useColorModeValue('blue.light', 'blue.dark');

    const modalContent = {
        login: {
            header: 'Log In to Investobull',
            body: <LoginForm setMode={setMode} />,
            footer: (
                <Text>
                    Don't have an account yet?
                    <Link
                        as="button"
                        onClick={() => setMode('signup')}
                        ml={2}
                        color={blueColor}
                    >
                        Sign Up!
                    </Link>
                </Text>
            ),
        },
        signup: {
            header: 'Sign Up for Investobull',
            body: <SignupForm />,
            footer: (
                <Text>
                    Already have an account?
                    <Link
                        as="button"
                        onClick={() => setMode('login')}
                        ml={2}
                        color={blueColor}
                    >
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
                    <Link
                        as="button"
                        onClick={() => setMode('signup')}
                        ml={2}
                        color={blueColor}
                    >
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
                variant="ghost"
                _hover={{ color: hoverColor }}
                mr={2}
            >
                Log In
            </Button>

            <Button
                onClick={() => {
                    setMode('signup');
                    onOpen();
                }}
                variant="outline"
                _hover={{ color: hoverColor }}
            >
                Sign Up
            </Button>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent
                    bgColor={useColorModeValue('brand.50', 'brand.800')}
                >
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
