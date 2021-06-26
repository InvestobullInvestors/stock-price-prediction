import React from 'react';
import {Flex, Link, Text} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {FaEnvelope, FaGithub} from 'react-icons/fa';

const Footer = () => (
    <Flex direction="column" p={16} align="center">
        <Flex align="center">
            <Text m={1}>Connect with us:</Text>
            <Link href="https://github.com/InvestoBull/stock-price-prediction"
                  isExternal={true}
                  p={0} bg="transparent" _hover={{color: "brand.500"}}>
                <Icon as={FaGithub} w={6} h={6} m={2}/>
            </Link>
            <Link href="mailto:team.investobull@gmail.com"
                  p={0} bg="transparent" _hover={{color: "brand.500"}}>
                <Icon as={FaEnvelope} w={6} h={6} m={2}/>
            </Link>
        </Flex>
        <Text color="brand.500" fontSize="sm">Copyright © InvestoBull 2021</Text>
    </Flex>
)

export default Footer;
