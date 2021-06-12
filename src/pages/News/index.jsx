import React, {useState} from "react";
import {Button, Heading, Center, Flex} from "@chakra-ui/react";
import PageTemplate from "../../components/PageTemplate";
import NewsGrid from "../../components/NewsGrid";

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
            <Flex justify="center">
                <CustomHeading mt={7}>News</CustomHeading>
            </Flex>
            <Flex justify="flex-end">
                <Button bg={color} onClick={handleChangeColor}>watchlist only</Button>
            </Flex>
            <NewsGrid/>
        </PageTemplate>
    )
}

export default News;
