import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { BiFilterAlt } from "react-icons/bi";
import NewsSourceChecklist from "./NewsSourceChecklist";

const NewsSourceDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        mt={7}
        ml={3}
        rightIcon={<BiFilterAlt />}
      >
        Filter
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
