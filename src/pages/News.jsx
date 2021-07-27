import React, { useEffect } from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import NewsCardList from "../components/News/NewsCardList";
import NewsSourceDrawer from "../components/News/NewsSourceDrawer";
import CustomHeading from "../components/CustomHeading";
import StaticNewsChecklist from "../components/News/StaticNewsChecklist";
import { Grid, useColorModeValue } from "@chakra-ui/react";
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
      <CustomHeading>News</CustomHeading>
      {/*<Button mt={7} bg={color} onClick={handleChangeColor}>watchlist only</Button>*/}
      <Grid display={["flex", "flex", "none", "none"]} gap={2}>
        <NewsSourceDrawer />
        <NewsCardList />
      </Grid>
      <Grid display={["none", "none", "flex", "flex"]}>
        <StaticNewsChecklist />
        <NewsCardList />
      </Grid>
    </PageTemplate>
  );
};

export default News;
