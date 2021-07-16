import React, { useState } from "react";
import {
  Checkbox,
  VStack,
  HStack,
  Text,
  Spacer,
  Button,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";
import { useStockNews } from "../../contexts/useStockNews";
import { set } from "react-hook-form";

const NewsSourceChecklist = () => {
  const { newsSelections } = useStockNews();
  const { selectSource } = useStockNews();
  const { selectAllSources } = useStockNews();
  const { unselectAllSources } = useStockNews();

  return (
    <>
      <VStack align="stretch">
        <HStack>
          <Button onClick={() => selectAllSources()}>Check All</Button>
          <Button onClick={() => unselectAllSources()}>Uncheck All</Button>
        </HStack>
        {newsSelections.map((source) => (
          <Checkbox
            key={source.id}
            value={source.name}
            isChecked={source.selected}
            onChange={(e) => selectSource(source)}
          >
            {source.name}
          </Checkbox>
        ))}
      </VStack>
    </>
  );
};

export default NewsSourceChecklist;
