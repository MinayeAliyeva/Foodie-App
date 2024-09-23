import React from "react";
import { Box, Image, Text, VStack, Tag, HStack } from "@chakra-ui/react";

interface RandomCardProps {
  randomMealAndCocktailData: {
    itemTitle: string;
    itemThumb: string;
    itemCategory: string;
    itemIngredients: string[];
  }[];
}

const RandomCard: React.FC<RandomCardProps> = ({
  randomMealAndCocktailData,
}) => {

  return (
    <>
      {randomMealAndCocktailData?.map((randomData, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          p={4}
          maxW="sm"
          mx="auto"
          mb={6}
          height="400px"
          transition="transform 0.2s, box-shadow 0.2s"
          _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
        >
          <Image
            src={randomData.itemThumb}
            alt={randomData.itemTitle}
            borderRadius="md"
            objectFit="cover"
            height="200px"
            width="300px"
            fallbackSrc="https://via.placeholder.com/200"
          />
          <VStack align="start" mt={4} spacing={2}>
            <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
              {randomData.itemTitle}
            </Text>
            <Tag colorScheme="teal" fontSize="sm">
              {randomData.itemCategory}
            </Tag>
            <Text fontSize="sm" fontWeight="medium">
              Malzemeler:
            </Text>
            <HStack
              spacing={2}
              overflowX="auto"
              maxH="60px"
              border="1px solid"
              borderColor="gray.200"
              p={2}
              borderRadius="md"
            >
              {randomData.itemIngredients?.map((ingredient, index) => (
                <Tag key={index} colorScheme="orange" fontSize="sm">
                  {ingredient}
                </Tag>
              ))}
            </HStack>
          </VStack>
        </Box>
      ))}
    </>
  );
};

export default RandomCard;
