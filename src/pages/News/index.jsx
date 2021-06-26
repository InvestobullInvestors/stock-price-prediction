import React, {useEffect, useState} from "react";
import {Button, Flex, Spacer} from "@chakra-ui/react";
import PageTemplate from "../../components/PageTemplate";
import NewsGrid from "../../components/NewsGrid";
import NewsSourceDrawer from "../../components/NewsSourceDrawer";
import CustomHeading from "../../components/CustomHeading";
import {useStockNews} from "../../hooks/useStockNews";

const News = () => {
    const [color, setColor] = useState("green");

    const handleChangeColor = (e) => {
        setColor(color === "green" ? "red" : "green");
    }

    const {setNewsSources, setNewsInfo, allNewsInfo} = useStockNews();

    useEffect(() => {
        setNewsSources();
        setNewsInfo();
    }, [])

    //TODO: enable watchlist filter
    return (
        <PageTemplate>
            <Flex>
                <NewsSourceDrawer/>
                {/*<Spacer/>*/}
                {/*<Button mt={7} bg={color} onClick={handleChangeColor}>watchlist only</Button>*/}
            </Flex>
            <CustomHeading>News</CustomHeading>
            <NewsGrid/>
        </PageTemplate>
    )
}

export default News;
