import React, {useState} from 'react';
import {Alert, AlertIcon, Button, FormControl, FormLabel, Input, InputRightElement, Link} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {useForm} from "react-hook-form";
import {useAuth} from "../../contexts/useAuth";

const LoginForm = ({closeLogin}) => {
    const {register, handleSubmit, formState} = useForm()
    const {login} = useAuth()

    const [showPW, setShowPW] = useState(false)
    const [error, setError] = useState("")

    const onSubmit = async (data) => {
        try {
            setError("")
            await login(data.email, data.password)
        } catch {
            // for security reasons, we don't expose why the login failed
            return setError("Failed to log in")
        }
    }

    const toggleForgotPassword = () => {
        closeLogin()
        // TODO: toggle ResetPasswordPopup
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
            <Link as="button" onClick={toggleForgotPassword} m={4}>Forgot Password?</Link>
        </form>
    )
}

export default LoginForm;
