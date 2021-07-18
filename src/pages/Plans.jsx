import React from "react";
import PageTemplate from "../components/pagetemplate/PageTemplate";
import PaymentPlanList from "../components/PaymentPlanList";
import ReviewCardList from "../components/ReviewCardList";
import CustomHeading from "../components/CustomHeading";
import {Divider, useColorModeValue} from "@chakra-ui/react";

const Plans = () => (
    <PageTemplate bgColor={useColorModeValue("brand.300", "brand.800")}>
        <CustomHeading>Select A Plan</CustomHeading>
        <PaymentPlanList/>
        <Divider my={16} orientation="horizontal"/>
        <CustomHeading>A Brand That Investors Trust</CustomHeading>
        <ReviewCardList/>
    </PageTemplate>
)

export default Plans;
