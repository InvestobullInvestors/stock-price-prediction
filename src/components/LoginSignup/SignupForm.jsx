import React, { useState } from 'react';
import {
    Alert,
    AlertIcon,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/useAuth';
import { auth } from '../../auth/firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';

const SignupForm = () => {
    const { register, handleSubmit, formState } = useForm();
    const { signup, uiConfig } = useAuth();

    const [showPW, setShowPW] = useState(false);
    const [showPWC, setShowPWC] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async ({
        firstname,
        lastname,
        email,
        password,
        passwordConfirmation,
    }) => {
        if (password !== passwordConfirmation)
            return setError('Passwords do not match');

        try {
            setError('');
            await signup(firstname + ' ' + lastname, email, password);
        } catch (err) {
            return setError(err.message);
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
            <FormControl id="firstname" isRequired mb={4}>
                <FormLabel>First Name</FormLabel>
                <Input
                    type="text"
                    placeholder="John"
                    {...register('firstname', { required: true })}
                />
            </FormControl>
            <FormControl id="lastname" isRequired mb={4}>
                <FormLabel>Last Name</FormLabel>
                <Input
                    type="text"
                    placeholder="Doe"
                    {...register('lastname', { required: true })}
                />
            </FormControl>
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
                    type={showPW ? 'text' : 'password'}
                    placeholder="password"
                    {...register('password', { required: true })}
                />
                <InputRightElement bottom={-8}>
                    <Button onClick={() => setShowPW(!showPW)} variant="ghost">
                        {showPW ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                </InputRightElement>
            </FormControl>
            <FormControl id="password-confirmation" isRequired mb={4}>
                <FormLabel>Password Confirmation</FormLabel>
                <Input
                    type={showPWC ? 'text' : 'password'}
                    placeholder="password"
                    {...register('passwordConfirmation', { required: true })}
                />
                <InputRightElement bottom={-8}>
                    <Button
                        onClick={() => setShowPWC(!showPWC)}
                        variant="ghost"
                    >
                        {showPWC ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                </InputRightElement>
            </FormControl>
            <Button isLoading={formState.isSubmitting} type="submit">
                Sign Up
            </Button>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </form>
    );
};

export default SignupForm;
