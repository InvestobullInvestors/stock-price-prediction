import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";

const ReviewCardList = () => (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
        <ReviewCard
            name="Himanshu Goyal"
            imageUrl="https://media-exp1.licdn.com/dms/image/C5603AQGSQ0CWJrsGbg/profile-displayphoto-shrink_800_800/0/1553838277450?e=1633564800&v=beta&t=Ai27ezxA-caXbBRnxPLPH7KWuSoJn3I3kBmNvcHu3oU"
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
            imageUrl="https://media-exp1.licdn.com/dms/image/C5603AQGBGjphCYLyHg/profile-displayphoto-shrink_200_200/0/1600194405585?e=1633564800&v=beta&t=fd3h-mONGi3IvsaiflQ4q5H4RVebVS57GXbRfOHcLOY"
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
