import React, {useState} from "react";
import {Button, Flex, Spacer} from "@chakra-ui/react";
import PageTemplate from "../../components/PageTemplate";
import NewsGrid from "../../components/NewsGrid";
import NewsSourceDrawer from "../../components/NewsSourceDrawer";
import CustomHeading from "../../components/CustomHeading";

const News = () => {
    const [color, setColor] = useState("green");

    const handleChangeColor = (e) => {
        setColor(color === "green" ? "red" : "green");
    }

    return (
        <PageTemplate>
            <Flex>
                <NewsSourceDrawer/>
                <Spacer/>
                <Button mt={7} bg={color} onClick={handleChangeColor}>watchlist only</Button>
            </Flex>
            <CustomHeading>News</CustomHeading>
            <NewsGrid/>
        </PageTemplate>
    )
}

export default News;
