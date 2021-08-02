import React from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import PaymentPlanList from "../components/PaymentPlan/PaymentPlanList";
import ReviewCardList from "../components/PaymentPlan/ReviewCardList";
import CustomHeading from "../components/CustomHeading";
import { Divider } from "@chakra-ui/react";

const Plans = () => (
    <PageTemplate>
        <CustomHeading>Select A Plan</CustomHeading>
        <PaymentPlanList />
        <Divider my={16} orientation="horizontal" />
        <CustomHeading>A Brand That Investors Trust</CustomHeading>
        <ReviewCardList />
    </PageTemplate>
);

export default Plans;
