import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import StockInfoProvider from './contexts/useStockInfo';
import AuthProvider from './contexts/useAuth';
import UserProvider from './contexts/useUser';
import PredictionProvider from './contexts/usePredictions';
import StockNewsProvider from './contexts/useStockNews';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';

const theme = extendTheme({
    fonts: {
        heading: 'Palatino',
        body: 'Open Sans',
    },
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    colors: {
        brand: {
            50: '#F7FAFC',
            100: '#EDF2F7',
            200: '#d5e1f2',
            300: '#bacfe8',
            400: '#90afd1',
            500: '#7689a6',
            600: '#4a566b',
            700: '#2D3748',
            800: '#1A202C',
            900: '#171923',
        },
        red: {
            light: '#D6333E',
            dark: '#E64550',
        },
        green: {
            light: '#00823C',
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
            light: '#995D02',
            dark: '#AD6B05',
        },
        silver: {
            light: '#757575',
            dark: '#B0B0B0',
        },
        gold: {
            light: '#A37B00',
            dark: '#D1AC00',
        },
    },
});

function App() {
    return (
        <UserProvider>
            <AuthProvider>
                <StockInfoProvider>
                    <PredictionProvider>
                        <StockNewsProvider>
                            <div className="App">
                                <ChakraProvider theme={theme}>
                                    <BrowserRouter>
                                        <Main />
                                    </BrowserRouter>
                                </ChakraProvider>
                            </div>
                        </StockNewsProvider>
                    </PredictionProvider>
                </StockInfoProvider>
            </AuthProvider>
        </UserProvider>
    );
}

export default App;
