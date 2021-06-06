import React from 'react';

import PaymentPlanCard from '../PaymentPlanCard';

export default {
    title: 'Payment Plan Card',
    component: PaymentPlanCard,
};

const Template = (args) => <PaymentPlanCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    id: 0,
    type: "Free",
    buttonText: "Start Exploring",
    price: 0,
    isRecommended: false,
    details: [
        "This plan is the best in the world",
        "This plan does nothing"
    ],
    onClick: () => {},
};