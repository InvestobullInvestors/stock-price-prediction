import React  from 'react';
import { Link } from 'react-router-dom';
import {Button, HStack, useColorMode} from "@chakra-ui/react";

function Header({...otherProps}) {
    const { toggleColorMode } = useColorMode()
    return (
        <HStack {...otherProps}>
            <Link to="/home"><h1 id="title">InvestoBull</h1></Link>
            <Link to="/home" className="navbar-right">Home</Link>
            <Link to="/plans" className="navbar-right">Plans</Link>
            <Button onClick={toggleColorMode} colorScheme="brand">Toggle theme</Button>
        </HStack>
    )
}

export default Header;
