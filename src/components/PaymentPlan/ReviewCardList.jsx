import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ReviewCard from './ReviewCard';

const ReviewCardList = () => (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
        <ReviewCard
            name="Himanshu Goyal"
            imageUrl="https://media-exp1.licdn.com/dms/image/C5603AQGSQ0CWJrsGbg/profile-displayphoto-shrink_800_800/0/1553838277450?e=1633564800&v=beta&t=Ai27ezxA-caXbBRnxPLPH7KWuSoJn3I3kBmNvcHu3oU"
            rating={5}
            reviewTitle="Dark mode!"
            reviewSummary="I enjoy using this app day and night. The dark mode really helps to reduce my eyestrain. I also like the ability to view the financial details of each company within my portfolio!"
        />
        <ReviewCard
            name="Weiyoung Tan"
            imageUrl="https://media-exp1.licdn.com/dms/image/C5603AQFkYs7-EfghLw/profile-displayphoto-shrink_800_800/0/1600668384338?e=1633564800&v=beta&t=gNYiLCixntquS9_2B4eHMMittWensxqMbk56tA6w04g"
            rating={4}
            reviewTitle="An affordable offering"
            reviewSummary="Wow, the subscription pricing is so much more affordable compared to other apps on the market. I also love the fact that I can login using my Google account."
        />
        <ReviewCard
            name="Raghav Thakur"
            imageUrl="https://media-exp1.licdn.com/dms/image/C5603AQGBGjphCYLyHg/profile-displayphoto-shrink_200_200/0/1600194405585?e=1633564800&v=beta&t=fd3h-mONGi3IvsaiflQ4q5H4RVebVS57GXbRfOHcLOY"
            rating={5}
            reviewTitle="An impressive app"
            reviewSummary="Being a passionate investor in tech stocks I really find value in having a seemless app that not only shows the stocks I'm interested in but also shows their predicted closing prices."
        />
        <ReviewCard
            name="Paul Freiwirth"
            imageUrl=""
            rating={4}
            reviewTitle="Love the news feature"
            reviewSummary="I really like being able to see the latest news from different sources all in one place. I found myself coming back to this app time and time again for this feature!"
        />
    </SimpleGrid>
);

export default ReviewCardList;
