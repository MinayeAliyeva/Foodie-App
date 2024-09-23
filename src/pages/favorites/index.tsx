import {useEffect, useState } from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import XCard from "../../shared/components/XCard";
import { GoInbox } from "react-icons/go";
import { useNavigate } from "react-router";
import XSpinner from "../../shared/components/XSpinner";
import { delay } from "../helpers";
import { IFavoriteData } from "../../modules";

const Favorites = () => {
  const navigate = useNavigate();

  const storedFavorites = localStorage.getItem("likes");
  const favorites: IFavoriteData[] = storedFavorites ? JSON.parse(storedFavorites) : [];
  
  const [loading, setLoading] = useState(false);
  const [favoriteList, setFavoriteList] = useState<IFavoriteData[]>(favorites);


  const handleLike = (id: string) => {
    const filteredFavoriteList = favoriteList?.filter(
      (favorite) => favorite?.id !== id
    );
    
    setFavoriteList(filteredFavoriteList);
    localStorage.setItem("likes", JSON.stringify(filteredFavoriteList));
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await delay(500).finally(() => setLoading(false));
    })();
  }, [favoriteList]);

  const handleDetail = (id?: string, key?: 'meal' | 'drink') => {
    if (id && key==='meal') {
      navigate(`/meal-detail/${id}`);
    }else {
      navigate(`/coctail-detail/${id}`);
    }
  };

  return (
    <>
      {loading ? (
          <Box style={{display: 'flex', alignItems: 'center', justifyContent:'center', height: '80vh'}}>
          <XSpinner/>
          </Box>
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
              {favoriteList.map((favorite, index: number) => (
                <XCard
                  key={index}
                  data={favorite}
                  handleLike={handleLike}
                  handleDetail={() => handleDetail(favorite?.id, favorite.key)}
                />
              ))}
            </Box>
          ) : (
            <Flex align="center" justifyContent="center" flexDirection="column" height={'70vh'}>
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
