import React, { useState } from "react";
import {
    Alert,
    AlertIcon,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/useAuth";

const ResetPasswordPopup = ({ setMode }) => {
    const { register, handleSubmit, formState } = useForm();
    const { resetPassword } = useAuth();

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async ({ email }) => {
        try {
            setMessage("");
            setError("");
            await resetPassword(email);
            setMessage("Check your inbox for further instructions.");
        } catch (err) {
            return setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {message && (
                <Alert status="success">
                    <AlertIcon />
                    {message}
                </Alert>
            )}
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
                    {...register("email", { required: true })}
                />
            </FormControl>
            <Button isLoading={formState.isSubmitting} type="submit">
                Reset Password
            </Button>
            <Flex>
                <Link
                    fontSize="sm"
                    as="button"
                    onClick={() => setMode("login")}
                    m={3}
                >
                    Back to Login
                </Link>
            </Flex>
        </form>
    );
};

export default ResetPasswordPopup;
