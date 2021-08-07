import React from 'react';
import {
    Avatar,
    Divider,
    Grid,
    GridItem,
    HStack,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';
import CustomBox from '../CustomBox';
import { Link } from '@chakra-ui/react';

const ImageAvatar = ({ name, imageUrl }) => (
    <GridItem colSpan={1}>
        <VStack>
            <Avatar size="2xl" name={name} src={imageUrl} />
            <Text>{name}</Text>
        </VStack>
    </GridItem>
);

const TeamMemberCard = ({
    name,
    imageUrl,
    linkedIn,
    title,
    summary,
    alignLeft,
    alignRight,
    ...otherProps
}) => (
    <CustomBox
        as={Link}
        href={linkedIn}
        isExternal
        _hover={{ cursor: 'pointer' }}
        alignSelf={alignLeft ? 'flex-start' : 'flex-end'}
        w="80%"
        m={0}
        {...otherProps}
    >
        <Grid templateColumns="repeat(6, 1fr)" alignItems="center">
            {alignLeft ? (
                <>
                    <ImageAvatar name={name} imageUrl={imageUrl} />
                    <Spacer />
                </>
            ) : null}
            <GridItem colSpan={4}>
                <VStack>
                    <HStack>
                        <Text>{name}</Text>
                    </HStack>
                    <Divider py={3} orientation="horizontal" />
                    <VStack>
                        <Text fontSize="lg">{title}</Text>
                        <Text>{summary}</Text>
                    </VStack>
                </VStack>
            </GridItem>
            {alignRight ? (
                <>
                    <Spacer />
                    <ImageAvatar name={name} imageUrl={imageUrl} />
                </>
            ) : null}
        </Grid>
    </CustomBox>
);

const AboutTeam = () => (
    <VStack spacing={8}>
        <TeamMemberCard
            name="Paul"
            imageUrl=""
            linkedIn=""
            title="Programmer"
            summary="I am very good at programming!"
            alignLeft
        />
        <TeamMemberCard
            name="Himanshu"
            imageUrl="https://media-exp1.licdn.com/dms/image/C5603AQGSQ0CWJrsGbg/profile-displayphoto-shrink_800_800/0/1553838277450?e=1633564800&v=beta&t=Ai27ezxA-caXbBRnxPLPH7KWuSoJn3I3kBmNvcHu3oU"
            linkedIn="https://www.linkedin.com/in/himanshu-g/"
            title="Programmer"
            summary="Wait really? Me too!"
            alignRight
        />
        <TeamMemberCard
            name="Weiyoung"
            imageUrl="https://media-exp1.licdn.com/dms/image/C5603AQFkYs7-EfghLw/profile-displayphoto-shrink_800_800/0/1600668384338?e=1633564800&v=beta&t=gNYiLCixntquS9_2B4eHMMittWensxqMbk56tA6w04g"
            linkedIn="https://www.linkedin.com/in/weiyoung/"
            title="Programmer"
            summary="Whoa what a coincidence me too!"
            alignLeft
        />
        <TeamMemberCard
            name="Raghav"
            imageUrl="https://media-exp1.licdn.com/dms/image/C5603AQGBGjphCYLyHg/profile-displayphoto-shrink_200_200/0/1600194405585?e=1633564800&v=beta&t=fd3h-mONGi3IvsaiflQ4q5H4RVebVS57GXbRfOHcLOY"
            linkedIn="https://www.linkedin.com/in/raghavthakur/"
            title="Programmer"
            summary="Stop it guys. I am the best at programming."
            alignRight
        />
    </VStack>
);

export default AboutTeam;
