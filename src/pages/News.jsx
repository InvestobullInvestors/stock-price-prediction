import React, {useEffect, useState} from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import NewsCardList from "../components/News/NewsCardList";
import NewsSourceDrawer from "../components/News/NewsSourceDrawer";
import CustomHeading from "../components/CustomHeading";
import {Flex} from "@chakra-ui/react";
import {useStockNews} from "../contexts/useStockNews";

const News = () => {
    const [color, setColor] = useState("green");

    const handleChangeColor = (e) => {
        setColor(color === "green" ? "red" : "green");
    };

    const {setNewsSelectionsFromFirebase, setNewsMasterlistFromMongo} = useStockNews();

    useEffect(() => {
        setNewsSelectionsFromFirebase();
        setNewsMasterlistFromMongo();
    }, []);

    //TODO: enable watchlist filter
    return (
        <PageTemplate>
            <Flex>
                <NewsSourceDrawer/>
                {/*<Spacer/>*/}
                {/*<Button mt={7} bg={color} onClick={handleChangeColor}>watchlist only</Button>*/}
            </Flex>
            <CustomHeading mt={0}>News</CustomHeading>
            <NewsCardList/>
        </PageTemplate>
    );
};

export default News;
