import React, { createContext, useContext, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

const LoginSignupPopupContext = createContext({});

const LoginSignupPopupProvider = ({ children }) => {
    const [mode, setMode] = useState('login');
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <LoginSignupPopupContext.Provider
            value={{ mode, setMode, isOpen, onOpen, onClose }}
        >
            {children}
        </LoginSignupPopupContext.Provider>
    );
};

export const useLoginSignupPopup = () => useContext(LoginSignupPopupContext);

export default LoginSignupPopupProvider;
