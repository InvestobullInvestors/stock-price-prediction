import { Link } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import React from 'react';

const SocialMediaButton = ({ url, icon, ...otherProps }) => (
    <Link href={url} isExternal _hover={{ color: 'brand.500' }} {...otherProps}>
        <Icon as={icon} boxSize={6} m={2} />
    </Link>
);

export default SocialMediaButton;
