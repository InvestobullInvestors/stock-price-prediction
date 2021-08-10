import React, { useState } from 'react';
import {
    Alert,
    AlertIcon,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputRightElement,
    Link,
    useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/useAuth';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { auth } from '../../auth/firebase';

const LoginForm = ({ setMode }) => {
    const { register, handleSubmit, formState } = useForm();
    const { login, uiConfig } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async ({ email, password }) => {
        try {
            setError('');
            await login(email, password);
        } catch {
            return setError('Failed to log in');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
                <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>
            )}
            <FormControl id="email" isRequired mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    placeholder="email@domain.com"
                    {...register('email', { required: true })}
                />
            </FormControl>
            <FormControl id="password" isRequired mb={4}>
                <FormLabel>Password</FormLabel>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="password"
                    {...register('password', { required: true })}
                />
                <InputRightElement bottom={-8}>
                    <Button
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                    >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                </InputRightElement>
            </FormControl>
            <Button isLoading={formState.isSubmitting} type="submit">
                Log In
            </Button>
            <Flex>
                <Link
                    fontSize="sm"
                    as="button"
                    onClick={() => setMode('resetPassword')}
                    m={3}
                    color={useColorModeValue('blue.light', 'blue.dark')}
                >
                    Forgot Password?
                </Link>
            </Flex>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </form>
    );
};

export default LoginForm;
