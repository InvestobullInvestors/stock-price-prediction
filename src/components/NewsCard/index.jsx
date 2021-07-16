import React from "react";
import { Box, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useStockNews } from "../../contexts/useStockNews";

const NewsArticle = ({ date, title, article }) => {
  return (
    <VStack spacing="0px" align="flex-start">
      <Text color="gray.500">{date}</Text>
      <Link href={article}>{title}</Link>
    </VStack>
  );
};

const NewsCard = ({ source, children, ...otherProps }) => {
  const boxColor = useColorModeValue("brand.100", "brand.700");

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
      <Text align="center" mt="5px" fontSize="xl" fontWeight="bold" dhp>
        {name}
      </Text>
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
  );
};

export default NewsCard;
