import React from "react";
import {
  Drawer,
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  HStack,
  Text,
  Spacer,
  Divider,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";
import NewsSourceChecklist from "../NewsSourceChecklist";

const Source = ({ title }) => {
  return (
    <HStack>
      <Text>{title}</Text>
      <Spacer />
      <CheckIcon />
    </HStack>
  );
};

const NewsSourceDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} mt={7}>
        sources
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Sources</DrawerHeader>
          <DrawerBody>
            <NewsSourceChecklist />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NewsSourceDrawer;
