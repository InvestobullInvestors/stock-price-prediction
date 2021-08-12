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
            summary="I worked on setting up the database schemas on Mongoose and connecting them to the backend APIs. I also developed the home page, plans page, and the stock details page, while setting up the Stripe payment workflow. I also worked on deploying the project to Vercel and setting up the cron jobs to pull real-time data."
            alignLeft
        />
        <TeamMemberCard
            name="Weiyoung Tan"
            imageUrl="https://media-exp1.licdn.com/dms/image/C5603AQFkYs7-EfghLw/profile-displayphoto-shrink_800_800/0/1600668384338?e=1633564800&v=beta&t=gNYiLCixntquS9_2B4eHMMittWensxqMbk56tA6w04g"
            linkedIn="https://www.linkedin.com/in/weiyoung/"
            github="https://github.com/weiyoung"
            summary="I worked on the user account integrations through Firebase Authentication and Cloud Firestore, frontend components such as the Navbar, Watchlist, Notifications, Payment popups and About Us, overall UI/UX, and README documentation. I also helped out with the Vercel deployment and cron jobs."
            alignRight
        />
        <TeamMemberCard
            name="Raghav Thakur"
            imageUrl="https://media-exp1.licdn.com/dms/image/C4D03AQGLWXRkOWTRXA/profile-displayphoto-shrink_800_800/0/1628714429453?e=1634169600&v=beta&t=P-zHnxEwfrIOR4iA4JFn0lJoigC-wJcJALl84JN36S4"
            linkedIn="https://www.linkedin.com/in/raghavthakur/"
            github="https://github.com/raghavthakur"
            summary="I worked on stock predictions, Microsoft Azure AutoML integration, trained and deployed machine learning models using historical data of Nasdaq stocks, initial development of frontend components such as Home and Stock Table, and Quick Start Guide."
            alignLeft
        />
        <TeamMemberCard
            name="Paul Freiwirth"
            imageUrl="/team-members/paul-freiwirth.jpg"
            linkedIn="https://www.linkedin.com/in/f-paul/"
            github="https://github.com/paulsgh"
            summary="I worked on designing the News page and news checklist components, as well as implementing the filtering features and responsive drag-and-drop functionalities."
            alignRight
        />
    </VStack>
);

export default OurTeam;
