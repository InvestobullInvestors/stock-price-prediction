import React from 'react';
import {SimpleGrid} from '@chakra-ui/react';
import PaymentPlanCard from '../PaymentPlanCard'

const PaymentPlanList = () => (
    <SimpleGrid columns={{base: 1, md: 3}} spacing={5}>
        <PaymentPlanCard type="Basic" price={0} buttonText="Start Exploring"
                         details={["This plan is the best in the world",
                             " This plan does nothing"]}/>
        <PaymentPlanCard type="Premium" price={5} buttonText="Subscribe Now"
                         details={["This plan is the best in the world",
                             " This plan does nothing"]}/>
        <PaymentPlanCard type="Unlimited" price={10} buttonText="Subscribe Now"
                         details={["This plan is the best in the world",
                             " This plan does nothing"]}/>
    </SimpleGrid>
)

export default PaymentPlanList;
