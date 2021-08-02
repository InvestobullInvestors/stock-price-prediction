import React from "react";
import {
    Avatar,
    Divider,
    HStack,
    SimpleGrid,
    Text,
    VStack,
} from "@chakra-ui/react";
import CustomBox from "../CustomBox";

const TeamMemberCard = ({ name, imageUrl, title, summary, ...otherProps }) => (
    <CustomBox {...otherProps}>
        <VStack>
            <HStack>
                <Avatar name={name} src={imageUrl} />
                <Text>{name}</Text>
            </HStack>
            <Divider py={3} orientation="horizontal" />
            <VStack>
                <Text fontSize="lg">{title}</Text>
                <Text>{summary}</Text>
            </VStack>
        </VStack>
    </CustomBox>
);

const AboutTeam = () => (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
        <TeamMemberCard
            name="Paul"
            imageUrl=""
            title="Programmer"
            summary="I am very good at programming!"
        />
        <TeamMemberCard
            name="Himanshu"
            imageUrl=""
            title="Programmer"
            summary="Wait really? Me too!"
        />
        <TeamMemberCard
            name="Weiyoung"
            imageUrl=""
            title="Programmer"
            summary="Whoa what a coincidence me too!"
        />
        <TeamMemberCard
            name="Raghav"
            imageUrl=""
            title="Programmer"
            summary="Stop it guys. I am the best at programming."
        />
    </SimpleGrid>
);

export default AboutTeam;
