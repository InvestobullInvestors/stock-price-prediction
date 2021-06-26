import React, {useState} from 'react';
import {Alert, AlertIcon, Button, FormControl, FormLabel, Input, InputRightElement} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {useForm} from "react-hook-form";
import {useAuth} from "../../contexts/useAuth";

const LoginForm = () => {
    const {register, handleSubmit, formState} = useForm()
    const {login} = useAuth()

    const [showPW, setShowPW] = useState(false)
    const [error, setError] = useState("")

    const onSubmit = async (data) => {
        try {
            setError("")
            await login(data.email, data.password)
        } catch {
            return setError("Failed to log in")
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
            <Button isLoading={formState.isSubmitting} type="submit">Log In</Button>
        </form>
    )
}

export default LoginForm;
