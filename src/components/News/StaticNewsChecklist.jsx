import { Divider, Heading, VStack } from "@chakra-ui/react";
import DrawerNewsChecklist from "./DrawerNewsChecklist";
import React from "react";
import CustomBox from "../CustomBox";

const StaticNewsChecklist = () => (
  <CustomBox p="4" ml="2" mt={5}>
    <VStack>
      <Heading size="md">Sources</Heading>
      <Divider orientation="horizontal" />
      <DrawerNewsChecklist />
    </VStack>
  </CustomBox>
);

export default StaticNewsChecklist;
