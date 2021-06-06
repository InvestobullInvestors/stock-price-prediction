import React  from 'react';
import { Link } from 'react-router-dom';
import {Button, HStack, useColorMode} from "@chakra-ui/react";

function Header({...otherProps}) {
    const { toggleColorMode } = useColorMode()
    return (
        <HStack {...otherProps}>
            <Link to="/home"><h1 id="title">Stock Predictions</h1></Link>
            <Link to="/plans" className="navbar-right">Plans</Link>
            <Link to="/home" className="navbar-right">Home</Link>
            <Button onClick={toggleColorMode} colorScheme="brand">Toggle theme</Button>
        </HStack>
    )
}

export default Header;
