import React, { createContext, useContext } from 'react';
import { useDisclosure } from '@chakra-ui/react';

const LoginSignupPopupContext = createContext({});

const LoginSignupPopupProvider = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <LoginSignupPopupContext.Provider value={{ isOpen, onOpen, onClose }}>
            {children}
        </LoginSignupPopupContext.Provider>
    );
};

export const useLoginSignupPopup = () => useContext(LoginSignupPopupContext);

export default LoginSignupPopupProvider;
