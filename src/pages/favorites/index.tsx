import React, { Suspense, useEffect, useState } from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import XCard from "../../shared/components/XCard";
import { GoInbox } from "react-icons/go";
import { useNavigate } from "react-router";
const delay = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ms), ms);
  });
};
const Favorites = () => {
  const navigate = useNavigate();

  const storedFavorites = localStorage.getItem("likes");
  const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  
  const [loading, setLoading] = useState(false);
  const [favoriteList, setFavoriteList] = useState(favorites);


  const handleLike = (id: string) => {
    console.log({id});
    console.log({favoriteList});
    
    const filteredFavoriteList = favoriteList?.filter(
      (favorite: any) => favorite?.id !== id
    );
    console.log({filteredFavoriteList});
    
    setFavoriteList(filteredFavoriteList);
    localStorage.setItem("likes", JSON.stringify(filteredFavoriteList));
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await delay(500).finally(() => setLoading(false));
    })();
  }, [favoriteList]);

  const handleDetail = (id: string | undefined) => {
    if (id) {
      navigate(`/detail/${id}`);
    }
  };

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
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
      )}
    </>
  );
};

export default Favorites;
