import React, {useState} from 'react';
import {Alert, AlertIcon, Button, FormControl, FormLabel, Input, InputRightElement} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {useForm} from "react-hook-form";
import {useAuth} from "../../contexts/useAuth";

const SignupForm = () => {
    const {register, handleSubmit, formState} = useForm()
    const {signup} = useAuth()

    const [showPW, setShowPW] = useState(false)
    const [showPWC, setShowPWC] = useState(false)
    const [error, setError] = useState("")

    const onSubmit = async (data) => {
        if (data.password !== data.passwordConfirmation)
            return setError("Passwords do not match")

        try {
            setError("")
            await signup(data.email, data.password)
        } catch {
            return setError("Failed to create account")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error &&
            <Alert status="error">
                <AlertIcon/>
                {error}
            </Alert>
            }
            <FormControl id="email" isRequired mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="email@domain.com" {...register('email', {required: true})}/>
            </FormControl>
            <FormControl id="password" isRequired mb={4}>
                <FormLabel>Password</FormLabel>
                <Input type={showPW ? "text" : "password"}
                       placeholder="password" {...register('password', {required: true})}/>
                <InputRightElement bottom={-8}>
                    <Button onClick={() => setShowPW(!showPW)}>
                        {showPW ? <ViewOffIcon/> : <ViewIcon/>}
                    </Button>
                </InputRightElement>
            </FormControl>
            <FormControl id="password-confirmation" isRequired mb={4}>
                <FormLabel>Password Confirmation</FormLabel>
                <Input type={showPWC ? "text" : "password"}
                       placeholder="password confirmation" {...register('passwordConfirmation', {required: true})}/>
                <InputRightElement bottom={-8}>
                    <Button onClick={() => setShowPWC(!showPWC)}>
                        {showPWC ? <ViewOffIcon/> : <ViewIcon/>}
                    </Button>
                </InputRightElement>
            </FormControl>
            <Button isLoading={formState.isSubmitting} type="submit">Sign Up</Button>
        </form>
    )
}

export default SignupForm;
