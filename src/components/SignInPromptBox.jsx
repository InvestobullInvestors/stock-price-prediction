import React from 'react';
import { Center, Link, Text, useColorModeValue } from '@chakra-ui/react';
import CustomBox from './CustomBox';
import { useLoginSignupPopup } from '../contexts/useLoginSignupPopup';

const SignInPromptBox = ({ text, ...otherProps }) => {
    const { setMode, onOpen } = useLoginSignupPopup();
    const blueColor = useColorModeValue('blue.light', 'blue.dark');

    return (
        <CustomBox {...otherProps}>
            <Center my={16}>
                <Text>
                    <Link
                        as="button"
                        onClick={() => {
                            setMode('login');
                            onOpen();
                        }}
                        color={blueColor}
                        mx={1}
                    >
                        Log In
                    </Link>
                    or
                    <Link
                        as="button"
                        onClick={() => {
                            setMode('signup');
                            onOpen();
                        }}
                        color={blueColor}
                        mx={1}
                    >
                        Sign Up
                    </Link>
                    {text}
                </Text>
            </Center>
        </CustomBox>
    );
};

export default SignInPromptBox;
