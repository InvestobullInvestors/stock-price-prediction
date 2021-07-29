import React, { useEffect } from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import NewsCardList from "../components/News/NewsCardList";
import ChecklistDrawer from "../components/News/ChecklistDrawer";
import CustomHeading from "../components/CustomHeading";
import StaticChecklistContainer from "../components/News/StaticChecklistContainer";
import { Button, Grid, useColorModeValue, VStack } from "@chakra-ui/react";
import { useStockNews } from "../contexts/useStockNews";
import { BiFilterAlt } from "react-icons/bi";

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
      <VStack>
        <CustomHeading mb={3}>News</CustomHeading>
        <Button
          colorScheme="blue"
          // onClick={onOpen}
          rightIcon={<BiFilterAlt />}
          minW={20}
          display={["flex", "flex", "none", "none"]}
        >
          Filter
        </Button>
      </VStack>
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
