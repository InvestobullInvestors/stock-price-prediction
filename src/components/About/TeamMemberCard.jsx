import { Avatar, Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SocialMediaButton from '../SocialMediaButton';

const CustomAvatar = ({ name, imageUrl }) => (
    <GridItem colSpan={1}>
        <Avatar size="3xl" src={imageUrl} name={name} />
    </GridItem>
);

const TeamMemberCard = ({
    name,
    imageUrl,
    linkedIn,
    github,
    summary,
    alignLeft,
    alignRight,
    ...otherProps
}) => (
    <Box
        alignSelf={alignLeft ? 'flex-start' : 'flex-end'}
        w={{ base: '100%', md: '70%' }}
        {...otherProps}
    >
        <Grid
            templateColumns="repeat(4, 1fr)"
            alignItems="center"
            gap={{ base: 0, md: 2 }}
        >
            {alignLeft && <CustomAvatar name={name} imageUrl={imageUrl} />}
            <GridItem
                colSpan={3}
                m={{ base: 2, md: 4 }}
                textAlign={alignLeft ? 'left' : 'right'}
            >
                <Heading as="h4" size="md" mb={2}>
                    {name}
                </Heading>
                <Text>{summary}</Text>
                <SocialMediaButton url={linkedIn} icon={FaLinkedin} />
                <SocialMediaButton url={github} icon={FaGithub} />
            </GridItem>
            {alignRight && <CustomAvatar name={name} imageUrl={imageUrl} />}
        </Grid>
    </Box>
);

export default TeamMemberCard;
