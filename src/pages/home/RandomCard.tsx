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

const RandomCard: React.FC<RandomCardProps> = ({ randomMealAndCocktailData }) => {
  return (
    <>
      {randomMealAndCocktailData?.map((randomData, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          p={4}
          maxW="sm"
          mx="auto"
          mb={4} // Kartlar arasında boşluk
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.02)", boxShadow: "xl" }} // Hover etkisi
        >
          <Image
            src={randomData.itemThumb}
            alt={randomData.itemTitle}
            borderRadius="md"
            objectFit="cover"
            height="200px" // Resim için sabit yükseklik
            width="100%"
          />
          <VStack align="start" mt={4} spacing={2}>
            <Text fontWeight="bold" fontSize="xl" noOfLines={1}>
              {randomData.itemTitle}
            </Text>
            <Tag colorScheme="teal">{randomData.itemCategory}</Tag>
            <Text fontSize="md" fontWeight="medium">
              Malzemeler:
            </Text>
            <HStack
              spacing={2}
              overflowY="auto"
              maxH="100px"
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
