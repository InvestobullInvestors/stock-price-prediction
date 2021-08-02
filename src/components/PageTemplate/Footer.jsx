import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Link, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { FaGithub, FaFacebookSquare, FaEnvelope } from "react-icons/fa";

const MARGIN = 2;

const CustomLink = ({ children, url }) => (
    <Link
        href={url}
        isExternal
        p={0}
        bg="transparent"
        _hover={{ color: "brand.500" }}
    >
        {children}
    </Link>
);

const CustomIcon = ({ icon }) => <Icon as={icon} w={6} h={6} m={MARGIN} />;

const Footer = () => (
    <Flex direction="column" p={16} align="center">
        <Flex align="center">
            <Link as={ReactRouterLink} to="/about" m={MARGIN}>
                About Us
            </Link>
            <Link m={MARGIN}>Help</Link>
        </Flex>
        <Flex align="center">
            <Text m={1}>Connect with us:</Text>
            <CustomLink url="https://github.com/InvestoBull/stock-price-prediction">
                <CustomIcon icon={FaGithub} />
            </CustomLink>
            <CustomLink url="https://www.facebook.com/people/Investobull-Investors/100068350916511/">
                <CustomIcon icon={FaFacebookSquare} />
            </CustomLink>
            <CustomLink url="mailto:team.investobull@gmail.com">
                <CustomIcon icon={FaEnvelope} />
            </CustomLink>
        </Flex>
        <Text color="brand.500" fontSize="sm" m={MARGIN}>
            Copyright © InvestoBull 2021
        </Text>
    </Flex>
);

export default Footer;
