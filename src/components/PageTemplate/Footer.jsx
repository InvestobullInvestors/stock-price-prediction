import React from 'react';
import {Flex, Link, Text} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {FaGithub, FaFacebookSquare, FaEnvelope} from 'react-icons/fa';

const MARGIN = 2

const Footer = () => (
    <Flex direction="column" p={16} align="center">
        <Flex align="center">
            <Link href="/about" m={MARGIN}>About Us</Link>
            <Link m={MARGIN}>Help</Link>
        </Flex>
        <Flex align="center">
            <Text m={1}>Connect with us:</Text>
            <Link href="https://github.com/InvestoBull/stock-price-prediction"
                  isExternal
                  p={0} bg="transparent" _hover={{color: "brand.500"}}>
                <Icon as={FaGithub} w={6} h={6} m={MARGIN}/>
            </Link>
            <Link href="https://www.facebook.com/people/Investobull-Investors/100068350916511/"
                  isExternal
                  p={0} bg="transparent" _hover={{color: "brand.500"}}>
                <Icon as={FaFacebookSquare} w={6} h={6} m={MARGIN}/>
            </Link>
            <Link href="mailto:team.investobull@gmail.com"
                  p={0} bg="transparent" _hover={{color: "brand.500"}}>
                <Icon as={FaEnvelope} w={6} h={6} m={MARGIN}/>
            </Link>
        </Flex>
        <Text color="brand.500" fontSize="sm" m={MARGIN}>Copyright © InvestoBull 2021</Text>
    </Flex>
)

export default Footer;
