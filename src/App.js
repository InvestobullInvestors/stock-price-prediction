import {BrowserRouter} from 'react-router-dom';
import Main from "./components/Main";
import {ChakraProvider, extendTheme} from "@chakra-ui/react"

const theme = extendTheme({
    config: {
        initialColorMode: "system",
        useSystemColorMode: false,
    },
    colors: {
        brand: {
            100: "#5fc9e7",
            200: "#5DADD5",
            300: "#5b91c3",
            400: "#5479A8",
            500: "#4c618d",
            600: "#3F4C78",
            700: "#313763",
            800: "#202349",
            900: "#0e0f2f"
        },
    },
})

function App() {
    return (
        <div className="App">
            <ChakraProvider theme={theme}>
                <BrowserRouter>
                    <div>
                        <Main/>
                    </div>
                </BrowserRouter>
            </ChakraProvider>
        </div>
    );
}

export default App;
