import React, { useEffect } from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import NewsCardList from "../components/News/NewsCardList";
import ChecklistDrawer from "../components/News/ChecklistDrawer";
import CustomHeading from "../components/CustomHeading";
import StaticChecklistContainer from "../components/News/StaticChecklistContainer";
import { Grid, useColorModeValue } from "@chakra-ui/react";
import { useStockNews } from "../contexts/useStockNews";

const News = () => {
  const {
    setNewsSelectionsFromFirebase,
    setNewsInfoFromMongo,
  } = useStockNews();

  useEffect(() => {
    setNewsSelectionsFromFirebase();
    setNewsInfoFromMongo();
  }, []);

  //TODO: enable watchlist filter
  return (
    <PageTemplate bgColor={useColorModeValue("brand.300", "brand.800")}>
      <CustomHeading>News</CustomHeading>
      {/*<Button mt={7} bg={color} onClick={handleChangeColor}>watchlist only</Button>*/}
      <Grid display={["none", "none", "flex", "flex"]}>
        <StaticChecklistContainer />
        <NewsCardList />
      </Grid>
      <Grid display={["flex", "flex", "none", "none"]} gap={2}>
        <ChecklistDrawer />
        <NewsCardList />
      </Grid>
    </PageTemplate>
  );
};

export default News;
