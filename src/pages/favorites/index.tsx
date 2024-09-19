import React, { useState } from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import XCard from "../../shared/components/XCard";
import { GoInbox } from "react-icons/go";
import { useNavigate } from "react-router";
const Favorites = () => {
  const storedFavorites = localStorage.getItem("likes");
  const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  const [favoriteList, setFavoriteList] = useState(favorites);
  const navigate = useNavigate();
  const handleLike = (idMeal: string) => {
    const filteredFavoriteList = favoriteList?.filter(
      (favorite: any) => favorite?.idMeal !== idMeal
    );
    setFavoriteList(filteredFavoriteList);
    localStorage.setItem("likes", JSON.stringify(filteredFavoriteList));
  };
  const handleDetail = (id: string | undefined) => {
    if (id) {
      navigate(`/detail/${id}`);
    }
  };
  return (
    <Box maxW="1200px" margin="auto">
      {favorites.length > 0 ? (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          {favoriteList.map((favorite: any, index: number) => (
            <XCard
              key={index}
              data={favorite}
              handleLike={handleLike}
              handleDetail={() => handleDetail(favorite?.idMeal)}
            />
          ))}
        </Box>
      ) : (
        <Flex align="center" justifyContent="center" flexDirection="column">
          <GoInbox fontSize="100px" />
          <Heading>No Favorites Added Yet</Heading>
        </Flex>
      )}
    </Box>
  );
};

export default Favorites;
