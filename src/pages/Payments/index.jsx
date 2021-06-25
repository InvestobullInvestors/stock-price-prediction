import React from "react";
import {Heading, Center, Divider, useColorModeValue} from "@chakra-ui/react";
import PageTemplate from "../../components/PageTemplate";
import PaymentPlanList from "../../components/PaymentPlanList";
import ReviewCardList from "../../components/ReviewCardList";
import CustomHeading from "../../components/CustomHeading";

const Payments = () => (
    <PageTemplate bgColor={useColorModeValue("brand.300", "brand.800")}>
        <CustomHeading mt={7}>Select A Plan</CustomHeading>
        <PaymentPlanList/>
        <Divider my={16} orientation="horizontal"/>
        <CustomHeading>A Brand That Investors Trust</CustomHeading>
        <ReviewCardList/>
    </PageTemplate>
)

export default Payments;
