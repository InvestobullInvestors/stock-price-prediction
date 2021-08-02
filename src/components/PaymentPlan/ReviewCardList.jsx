import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";

const ReviewCardList = () => (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
        <ReviewCard
            name="Himanshu Goyal"
            imageUrl=""
            rating={5}
            reviewTitle="This is the best"
            reviewSummary="I do not know what to write"
        />
        <ReviewCard
            name="Weiyoung Tan"
            imageUrl=""
            rating={4}
            reviewTitle="I love it"
            reviewSummary="Neither do I"
        />
        <ReviewCard
            name="Raghav"
            imageUrl=""
            rating={5}
            reviewTitle="Amazing job"
            reviewSummary="I like how interactive the website is. It has a nice UI."
        />
        <ReviewCard
            name="Paul"
            imageUrl=""
            rating={4}
            reviewTitle="Can't ask for any better"
            reviewSummary="I am happy to see this progress"
        />
    </SimpleGrid>
);

export default ReviewCardList;
