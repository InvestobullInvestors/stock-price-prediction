import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import StockInfoProvider from "./contexts/useStockInfo";
import AuthProvider from "./contexts/useAuth";
import UserProvider from "./contexts/useUser";
import PredictionProvider from "./contexts/usePredictions";
import StockNewsProvider from "./contexts/useStockNews";

const theme = extendTheme({
    config: {
        initialColorMode: "system",
        useSystemColorMode: true,
    },
    colors: {
        brand: {
            50: "#F7FAFC",
            100: "#EDF2F7",
            200: "#E2E8F0",
            300: "#CBD5E0",
            400: "#A0AEC0",
            500: "#718096",
            600: "#4A5568",
            700: "#2D3748",
            800: "#1A202C",
            900: "#171923",
        },
        red: {
            light: "#D6333E",
            dark: "#E64550",
        },
        green: {
            light: "#00823C",
            dark: "#12C766",
        },
        blue: {
            light: "#007AFF",
            dark: "#1489FF",
        },
        yellow: {
            light: "#F0A800",
            dark: "#FFC01E",
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
