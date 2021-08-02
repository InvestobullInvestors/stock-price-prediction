import React from "react";
import {
    Text,
    VStack,
    HStack,
    Avatar,
    Divider,
    useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import CustomBox from "../CustomBox";

const StartRatings = ({ rating }) => {
    const ratingStars = [];
    for (let i = 0; i < rating; i++) {
        ratingStars.push(<StarIcon w={5} h={5} color="#FDCC0D" />);
    }
    return <>{ratingStars}</>;
};

const ReviewCard = ({
    name,
    imageUrl,
    rating,
    reviewTitle,
    reviewSummary,
    ...otherProps
}) => {
    return (
        <CustomBox
            bg={useColorModeValue("brand.400", "brand.700")}
            {...otherProps}
        >
            <VStack>
                <HStack>
                    <Avatar name={name} src={imageUrl} />
                    <Text>{name}</Text>
                </HStack>
                <VStack>
                    <HStack>
                        <StartRatings rating={rating} />
                    </HStack>
                    <Text>Google</Text>
                </VStack>
                <Divider py={3} orientation="horizontal" />
                <HStack>
                    <Text fontSize="lg">{reviewTitle}</Text>
                </HStack>
                <Text>{reviewSummary}</Text>
            </VStack>
        </CustomBox>
    );
};

export default ReviewCard;
