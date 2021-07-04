import {BrowserRouter} from 'react-router-dom';
import Main from "./components/Main";
import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import StockInfoProvider from "./hooks/useStockInfo";
import PredictionProvider from "./hooks/usePredictions";
import StockNewsProvider from "./hooks/useStockNews";

const theme = extendTheme({
    config: {
        initialColorMode: "system",
        useSystemColorMode: false,
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
            900: "#171923"
        },
    },
})

function App() {
    return (
        <StockInfoProvider>
            <PredictionProvider>
                <StockNewsProvider>
                    <div className="App">
                        <ChakraProvider theme={theme}>
                            <BrowserRouter>
                                <div>
                                    <Main/>
                                </div>
                            </BrowserRouter>
                        </ChakraProvider>
                    </div>
                </StockNewsProvider>
            </PredictionProvider>
        </StockInfoProvider>
    );
}

export default App;
