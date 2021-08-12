import React from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import CustomHeading from '../components/CustomHeading';
import OurVision from '../components/About/OurVision';
import OurTeam from '../components/About/OurTeam';

const About = () => (
    <PageTemplate>
        <CustomHeading>Our Vision</CustomHeading>
        <OurVision />
        <CustomHeading>Our Team</CustomHeading>
        <OurTeam />
    </PageTemplate>
);

export default About;
