import React from 'react';
import {Box, Text, VStack, useColorModeValue, HStack, Avatar, Divider} from '@chakra-ui/react';
import {StarIcon} from '@chakra-ui/icons'

const ReviewCard = ({name, imageUrl, reviewTitle, reviewSummary, ...otherProps}) => {
    const boxColor = useColorModeValue("brand.100", "brand.700");
    return (
        <Box mx={3} mt={5} px={4} py={10} borderRadius="lg" shadow="md" bg={boxColor} {...otherProps}>
            <VStack>
                <HStack>
                    <Avatar name={name} src={imageUrl}/>
                    <Text>{name}</Text>
                </HStack>
                <HStack>
                    <StarIcon w={5} h={5} color="yellow"/>
                    <StarIcon w={5} h={5} color="yellow"/>
                    <StarIcon w={5} h={5} color="yellow"/>
                    <StarIcon w={5} h={5} color="yellow"/>
                    <StarIcon w={5} h={5} color="yellow"/>
                    <Text>Google</Text>
                </HStack>
                <Divider py={3} orientation="horizontal"/>
                <HStack>
                    <Text fontSize="lg">{reviewTitle}</Text>
                </HStack>
                <Text>{reviewSummary}</Text>
            </VStack>
        </Box>
    )
}

export default ReviewCard;
