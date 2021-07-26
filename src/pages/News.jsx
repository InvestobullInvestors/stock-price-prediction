import React, { useEffect } from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import NewsCardList from "../components/News/NewsCardList";
import NewsSourceDrawer from "../components/News/NewsSourceDrawer";
import CustomHeading from "../components/CustomHeading";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useStockNews } from "../contexts/useStockNews";

const News = () => {
  const {
    setNewsSelectionsFromFirebase,
    setNewsMasterlistFromMongo,
  } = useStockNews();

  useEffect(() => {
    setNewsSelectionsFromFirebase();
    setNewsMasterlistFromMongo();
  }, []);

  //TODO: enable watchlist filter
  return (
    <PageTemplate bgColor={useColorModeValue("brand.300", "brand.800")}>
      <Flex>
        <NewsSourceDrawer />
        {/*<Spacer/>*/}
        {/*<Button mt={7} bg={color} onClick={handleChangeColor}>watchlist only</Button>*/}
      </Flex>
      <CustomHeading mt={0}>News</CustomHeading>
      <NewsCardList />
    </PageTemplate>
  );
};

export default News;
