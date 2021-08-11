import React from 'react';
import { VStack } from '@chakra-ui/react';
import TeamMemberCard from './TeamMemberCard';

const OurTeam = () => (
    <VStack spacing={12} m={4}>
        <TeamMemberCard
            name="Himanshu Goyal"
            imageUrl="https://media-exp1.licdn.com/dms/image/C5603AQGSQ0CWJrsGbg/profile-displayphoto-shrink_800_800/0/1553838277450?e=1633564800&v=beta&t=Ai27ezxA-caXbBRnxPLPH7KWuSoJn3I3kBmNvcHu3oU"
            linkedIn="https://www.linkedin.com/in/himanshu-g/"
            github="https://github.com/HGoyal09"
            summary="Himanshu mostly worked on ..."
            alignLeft
        />
        <TeamMemberCard
            name="Weiyoung Tan"
            imageUrl="https://media-exp1.licdn.com/dms/image/C5603AQFkYs7-EfghLw/profile-displayphoto-shrink_800_800/0/1600668384338?e=1633564800&v=beta&t=gNYiLCixntquS9_2B4eHMMittWensxqMbk56tA6w04g"
            linkedIn="https://www.linkedin.com/in/weiyoung/"
            github="https://github.com/weiyoung"
            summary="Weiyoung mostly worked on the Firebase Auth and Cloud Firestore integration, user accounts, and frontend components such as the Navbar, Watchlist, Plans and About Us."
            alignRight
        />
        <TeamMemberCard
            name="Raghav Thakur"
            imageUrl="https://media-exp1.licdn.com/dms/image/C4D03AQGLWXRkOWTRXA/profile-displayphoto-shrink_800_800/0/1628714429453?e=1634169600&v=beta&t=P-zHnxEwfrIOR4iA4JFn0lJoigC-wJcJALl84JN36S4"
            linkedIn="https://www.linkedin.com/in/raghavthakur/"
            github="https://github.com/raghavthakur"
            summary="Raghav worked on ..."
            alignLeft
        />
        <TeamMemberCard
            name="Paul Freiwirth"
            imageUrl="/team-members/paul-freiwirth.jpg"
            linkedIn="https://www.linkedin.com/in/f-paul/?fbclid=IwAR18t50rQJ5F-K17PesQcEyuLxLI7UH7iiiOghieTUz-DRAvFKy1sC6K1F0"
            github="https://github.com/paulsgh"
            summary="Paul worked on the news page, implementing the drag and drop system..."
            alignRight
        />
    </VStack>
);

export default OurTeam;
