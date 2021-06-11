import React from 'react';
import {Flex, Link, Text} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {FaEnvelope, FaGithub} from 'react-icons/fa';

const Footer = () => {
    return (
        <Flex direction="column" m={16} align="center">
            <Flex align="center">
                <Text m={2}>Contact us: </Text>
                <Link href="https://github.com/InvestoBull/stock-price-prediction"
                      isExternal={true}
                      p={0} bg="transparent" borderRadius="full">
                    <Icon as={FaGithub} w={5} h={5} m={2}/>
                </Link>
                <Link href="mailto:team.investobull@gmail.com"
                      p={0} bg="transparent" borderRadius="full">
                    <Icon as={FaEnvelope} w={5} h={5} m={2}/>
                </Link>
            </Flex>
            Copyright © InvestoBull 2021
        </Flex>
    );
};

export default Footer;
