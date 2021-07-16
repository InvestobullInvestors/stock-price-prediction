import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import PageTemplate from "../../components/PageTemplate";
import NewsGrid from "../../components/NewsGrid";
import NewsSourceDrawer from "../../components/NewsSourceDrawer";
import CustomHeading from "../../components/CustomHeading";
import { useStockNews } from "../../contexts/useStockNews";

const News = () => {
  const [color, setColor] = useState("green");

  const handleChangeColor = (e) => {
    setColor(color === "green" ? "red" : "green");
  };

  const { setNewsSelections2, setNewsMasterlist2 } = useStockNews();

  useEffect(() => {
    setNewsSelections2();
    setNewsMasterlist2();
  }, []);

  //TODO: enable watchlist filter
  return (
    <PageTemplate>
      <Flex>
        <NewsSourceDrawer />
        {/*<Spacer/>*/}
        {/*<Button mt={7} bg={color} onClick={handleChangeColor}>watchlist only</Button>*/}
      </Flex>
      <CustomHeading>News</CustomHeading>
      <NewsGrid />
    </PageTemplate>
  );
};

export default News;
