import React from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import CustomHeading from '../components/CustomHeading';
import OurGoal from '../components/About/OurGoal';
import OurTeam from '../components/About/OurTeam';

const About = () => (
    <PageTemplate>
        <CustomHeading>Our Goal</CustomHeading>
        <OurGoal />
        <CustomHeading>Our Team</CustomHeading>
        <OurTeam />
    </PageTemplate>
);

export default About;
