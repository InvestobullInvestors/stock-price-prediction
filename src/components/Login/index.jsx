import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";

const Login = ({setLoggedIn}) => {
    const [isLogin, setIsLogin] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, errors, setError, formState } = useForm()

    const onSubmit = (data) => {
        setLoggedIn(true)
    }

    return (
        <>
            <Button onClick={onOpen}>Log In</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl id="login-signup" isRequired>
                                <FormLabel htmlFor="username">Username</FormLabel>
                                <Input name="username" placeholder="Username" {...register('username', {required: true})}/>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Input name="password" placeholder="Password" {...register('password', {required: true})}/>
                            </FormControl>
                        </form>
                    </ModalBody>
                    <ModalFooter>Don't have an account yet? Sign Up!</ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
};

export default Login;
