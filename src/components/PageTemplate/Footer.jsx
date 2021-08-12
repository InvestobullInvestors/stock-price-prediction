import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Link, Text } from '@chakra-ui/react';
import { FaGithub, FaFacebookSquare, FaEnvelope } from 'react-icons/fa';
import SocialMediaButton from '../SocialMediaButton';

const Footer = () => (
    <Flex direction="column" p={16} align="center">
        <Flex align="center">
            <Link as={ReactRouterLink} to="/about" m={2} fontSize="lg">
                About Us
            </Link>
            <Link
                href="https://drive.google.com/file/d/1XGfFeO6v_aEfeBdAqSZux_9Bni-dOc9I/view?usp=sharing"
                isExternal
                m={2}
                fontSize="lg"
            >
                Quick Start Guide
            </Link>
        </Flex>
        <Flex align="center">
            <Text m={1}>Connect with us:</Text>
            <SocialMediaButton
                url="https://github.com/InvestobullInvestors/stock-price-prediction"
                icon={FaGithub}
            />
            <SocialMediaButton
                url="https://www.facebook.com/Investobull-106251995094607"
                icon={FaFacebookSquare}
            />
            <SocialMediaButton
                url="mailto:team.investobull@gmail.com"
                icon={FaEnvelope}
            />
        </Flex>
        <Text color="brand.500" fontSize="sm" m={2}>
            Copyright © InvestoBull 2021
        </Text>
    </Flex>
);

export default Footer;
