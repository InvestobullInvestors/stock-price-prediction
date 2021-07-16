import React from "react";
import {
  Box,
  Link,
  Text,
  Center,
  useColorModeValue,
  VStack,
  Square,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { useStockNews } from "../../../contexts/useStockNews";

const NewsArticle = ({ date, title, article }) => {
  return (
    <VStack spacing="0px" align="flex-start">
      <Text color="gray.500">{date}</Text>
      <Link color="black" href={article}>
        {title}
      </Link>
    </VStack>
  );
};

const NewsCard = ({ source, children, ...otherProps }) => {
  const boxColor = useColorModeValue("brand.100", "brand.700");

  let notBoxColor;

  if (boxColor === "brand.100") {
    notBoxColor = "brand.700";
  } else {
    notBoxColor = "brand.100";
  }

  const { newsMasterlist } = useStockNews();

  let name;
  let articles;

  let targetSource = newsMasterlist.find(
    (currSource) => currSource.id === source.id
  );
  if (targetSource !== undefined) {
    name = targetSource.name;
    articles = targetSource.articles;
  } else {
    name = "";
    articles = [];
  }

  return (
    <Box
      width="100%"
      height="100%"
      mx={3}
      mt={5}
      px={4}
      py={4}
      border="1px"
      borderColor="brand.400"
      borderRadius="lg"
      shadow="md"
      bg={boxColor}
      {...otherProps}
    >
      {children}
      <HStack mt="10px">
        <Square
          w={{ base: "100px", sm: "150px" }}
          h={{ base: "100px", sm: "150px" }}
          // w="150px"
          // h="150px"
          border="1px"
          borderColor="brand.400"
          borderRadius="lg"
          shadow="md"
          bg={notBoxColor}
        >
          {/*<Square w="20%" h="15%">*/}
          <Text
            // color="brand.900"
            align="center"
            mt="5px"
            fontSize={{ base: "md", sm: "2xl" }}
            fontWeight="bold"
            color={boxColor}
          >
            {name}
          </Text>
        </Square>
        <Center height="150px">
          <Divider orientation="vertical" />
        </Center>
        <Box
          w="full"
          h="150px"
          border="1px"
          borderColor="brand.400"
          borderRadius="lg"
          shadow="md"
          bg={notBoxColor}
          padding="5px"
          overflow="scroll"
        >
          <VStack align="flex-start">
            {articles.map((article) => (
              <NewsArticle
                date={article.date}
                title={article.title}
                article={article.src}
              />
            ))}
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default NewsCard;
