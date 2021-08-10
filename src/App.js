import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import StockInfoProvider from './contexts/useStockInfo';
import AuthProvider from './contexts/useAuth';
import UserProvider from './contexts/useUser';
import PredictionProvider from './contexts/usePredictions';
import StockNewsProvider from './contexts/useStockNews';
import LoginSignupPopupProvider from './contexts/useLoginSignupPopup';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';

const theme = extendTheme({
    fonts: {
        heading: 'Open Sans',
        body: 'Open Sans',
    },
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    colors: {
        brand: {
            50: '#FFFFFF',
            100: '#F7FAFC',
            200: '#E6EEF8',
            300: '#BACFE8',
            400: '#90AFD1',
            500: '#7689A6',
            600: '#4A566B',
            700: '#2D3748',
            800: '#1A202C',
            900: '#171923',
        },
        red: {
            light: '#F81C29',
            dark: '#FF303E',
        },
        green: {
            light: '#01AB4B',
            dark: '#12C766',
        },
        blue: {
            light: '#007AFF',
            dark: '#1489FF',
        },
        yellow: {
            light: '#F0A800',
            dark: '#FFC01E',
        },
        bronze: {
            light: '#8D5400',
            dark: '#C57800',
        },
        silver: {
            light: '#929292',
            dark: '#BDBDBD',
        },
        gold: {
            light: '#C49F00',
            dark: '#D2AC01',
        },
    },
});

function App() {
    return (
        <UserProvider>
            <AuthProvider>
                <LoginSignupPopupProvider>
                    <StockInfoProvider>
                        <PredictionProvider>
                            <StockNewsProvider>
                                <ChakraProvider theme={theme}>
                                    <BrowserRouter>
                                        <Main />
                                    </BrowserRouter>
                                </ChakraProvider>
                            </StockNewsProvider>
                        </PredictionProvider>
                    </StockInfoProvider>
                </LoginSignupPopupProvider>
            </AuthProvider>
        </UserProvider>
    );
}

export default App;
