import React, {useState} from "react";
import {Button, Heading, Center, Flex, Spacer} from "@chakra-ui/react";
import PageTemplate from "../../components/PageTemplate";
import NewsGrid from "../../components/NewsGrid";
import NewsSourceDrawer from "../../components/NewsSourceDrawer";

const CustomHeading = ({children, ...otherProps}) => (
    <Center>
        <Heading as="h2" size="xl" {...otherProps}>
            {children}
        </Heading>
    </Center>
)

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
