import React from "react";
import { Box, Heading, Grid, Flex, Divider } from "@chakra-ui/react";
import XCard from "../../shared/components/XCard";
import { GoInbox } from "react-icons/go";
const Favorites = () => {
  const storedFavorites = localStorage.getItem("likes");
  const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

  return (
    <Box  maxW="1200px" margin="auto">
      {favorites.length > 0 ? (
        <Box  style={{display:'flex',alignItems:'center' ,flexWrap:'wrap',gap:'15px'}}>
          {favorites.map((favorite: any, index: number) => (
            <XCard
              key={index}
              title={favorite.strMeal || favorite.strDrink}
              content={`Category: ${favorite.strCategory || "N/A"}`}
              image={favorite.strMealThumb || favorite.strDrinkThumb}
              meal={favorite.strMeal ? favorite : undefined}
              drink={favorite.strDrink ? favorite : undefined}
            />
          ))}
        </Box>
      ) : (
        <Flex
          // height="800px"
          align="center"
          justifyContent="center"
          flexDirection="column"
        >
          <GoInbox fontSize="100px" />
          <Heading>No Favorites Added Yet</Heading>
        </Flex>
      )}
    </Box>
  );
};

export default Favorites;
