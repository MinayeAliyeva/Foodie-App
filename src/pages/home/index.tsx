import { useState, Suspense, lazy, useEffect } from "react";
import {
  Box,
  Input,
  Text,
  Flex,
  VStack,
  Stack,
  Heading,
  Divider,
  Skeleton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetCoctailsQuery, useGetMealsQuery } from "../../store";
import { useDebounce } from "../../hooks/useDebounce";
import { useLazyGetRandomMealQueryQuery } from "../../store/apis/mealsApi";
import { Typography } from "antd";
import { IFavoriteData } from "../../modules";
import HomeCard from "./HomeCard";
import {
  Cocktail,
  CocktailsResponse,
  useLazyGetCoctailDetailQuery,
  useLazyGetRandomcocktailQuery,
} from "../../store/apis/coctailApi";
import RandomCard from "./RandomCard";

const Home = () => {
  const storedFavorites = localStorage.getItem("likes");
  const [mainData, setMainData] = useState<IFavoriteData[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [randomData, setRandomData] = useState<any>(null);
  const debouncedSearchValue = useDebounce(searchValue, 1000);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searching, setSearching] = useState(false);
  const [drinksDataForCatagories, setDrinksDataForCatagories] = useState<
    Cocktail[]
  >([]);
  const [randomMealAndCocktailData, setRandomMealAndCocktailData] =
    useState<any>([]);

  const {
    data: mealsData,
    error: mealsError,
    isLoading: mealsLoading,
  } = useGetMealsQuery(debouncedSearchValue, {
    skip: !!searchValue.length && searchValue.length <= 2,
  });

  const {
    data: drinksData,
    error: drinksError,
    isLoading: drinksLoading,
  } = useGetCoctailsQuery(debouncedSearchValue, {
    skip: !!searchValue.length && searchValue.length <= 2,
  });

  const [
    getCoctailById,
    { data: coctailByData, isFetching: isFetchingCoctailDetaiById },
  ] = useLazyGetCoctailDetailQuery();
  const [getRandomMealData, { data: randomMealData }] =
    useLazyGetRandomMealQueryQuery<any>();
  const [getRandomCocktail, { data: randomCocktailData }] =
    useLazyGetRandomcocktailQuery();

  useEffect(() => {
    if (!randomMealData?.meals && !randomCocktailData?.drinks) return;

    const randomMealDataList =
      randomMealData?.meals?.map((meal: any) => ({
        itemTitle: meal?.strMeal,
        itemThumb: meal?.strMealThumb,
        itemCategory: meal?.strCategory,
        itemIngredients: [
          meal?.strIngredient1,
          meal?.strIngredient2,
          meal?.strIngredient3,
        ].filter(Boolean),
        id: meal?.idMeal,
        isLiked: !!JSON.parse(storedFavorites!)?.find(
          (favorite: any) => favorite?.id === meal?.idMeal
        ),
        key: "meal",
      })) ?? [];

    const randomCocktailDataList =
      randomCocktailData?.drinks?.map((drink: any) => ({
        itemTitle: drink?.strDrink,
        itemThumb: drink?.strDrinkThumb,
        itemCategory: drink?.strCategory,
        itemIngredients: [
          drink?.strIngredient1,
          drink?.strIngredient2,
          drink?.strIngredient3,
        ].filter(Boolean),
        id: drink?.idDrink,
        isLiked: !!JSON.parse(storedFavorites!)?.find(
          (favorite: any) => favorite?.id === drink?.idDrink
        ),
        key: "drink",
      })) ?? [];

    setRandomMealAndCocktailData((prevState: any) => {
      const combinedData = [...randomMealDataList, ...randomCocktailDataList];

      const uniqueData = combinedData.filter(
        (newItem) =>
          !prevState.some((prevItem: any) => prevItem.id === newItem.id)
      );
      onOpen();
      return [...prevState, ...uniqueData];
    });
  }, [randomMealData?.meals, randomCocktailData?.drinks, storedFavorites]);

  useEffect(() => {
    setDrinksDataForCatagories(drinksData?.drinks!);
  }, [drinksData]);
  useEffect(() => {
    const idDrink = drinksDataForCatagories?.find((catagorieData) =>
      catagorieData?.strDrink.includes(debouncedSearchValue)
    )?.idDrink;
    if (idDrink) {
      getCoctailById(idDrink, true);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (coctailByData) {
      const drinkDataList =
        (coctailByData?.drinks?.map((drink: any) => ({
          itemTitle: drink?.strDrink,
          itemThumb: drink?.strDrinkThumb,
          itemCategory: drink?.strCategory,
          itemIngredients: [
            drink?.strIngredient1,
            drink?.strIngredient2,
            drink?.strIngredient3,
          ].filter(Boolean),
          id: drink?.idDrink,
          isLiked: !!JSON.parse(storedFavorites!)?.find(
            (favorie: any) => favorie?.id === drink?.idDrink
          ),
          key: "drink",
        })) as any) ?? [];

      setMainData(drinkDataList);
    }
  }, [coctailByData]);

  useEffect(() => {
    const mealDataList =
      (mealsData?.meals?.map((meal) => ({
        itemTitle: meal?.strMeal,
        itemThumb: meal?.strMealThumb,
        itemCategory: meal?.strCategory,
        itemIngredients: [
          meal?.strIngredient1,
          meal?.strIngredient2,
          meal?.strIngredient3,
        ].filter(Boolean),
        id: meal?.idMeal,
        isLiked: !!JSON.parse(storedFavorites!)?.find(
          (favorie: any) => favorie?.id === meal?.idMeal
        ),
        key: "meal",
      })) as any) ?? [];

    const drinkDataList =
      (drinksData?.drinks?.map((drink) => ({
        itemTitle: drink?.strDrink,
        itemThumb: drink?.strDrinkThumb,
        itemCategory: drink?.strCategory,
        itemIngredients: [
          drink?.strIngredient1,
          drink?.strIngredient2,
          drink?.strIngredient3,
        ].filter(Boolean),
        id: drink?.idDrink,
        isLiked: !!JSON.parse(storedFavorites!)?.find(
          (favorie: any) => favorie?.id === drink?.idDrink
        ),
        key: "drink",
      })) as any) ?? [];

    setMainData([...mealDataList, ...drinkDataList]);
  }, [drinksData?.drinks, mealsData?.meals]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearching(true);
    setSearchValue(event.target.value);
  };

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Heading as="h3" size="lg" color="teal.500" mb={4}>
        Tüm Menü
      </Heading>
      <Flex mb={6} align="center" justify="space-between">
        <Input
          onChange={handleSearchChange}
          type="text"
          placeholder="Yemek veya içecek ara..."
          value={searchValue}
          size="lg"
          border="2px solid #ccc"
          borderRadius="md"
          _placeholder={{ color: "gray.500" }}
          _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }}
          width="80%"
        />

        <Button onClick={() => getRandomMealData()} ml={4} colorScheme="teal">
          Random Bir Yemek
        </Button>
        <Button ml={4} colorScheme="teal" onClick={() => getRandomCocktail()}>
          Random Bir İçecek
        </Button>
      </Flex>

      {searchValue.length > 0 && searchValue.length < 2 && (
        <Typography style={{ color: "red", fontWeight: "bold" }} color="red">
          En az 2 karakter girmelisiniz
        </Typography>
      )}
      <VStack spacing={8} align="start">
        <Stack spacing={4} w="full">
          <Divider borderColor="teal.300" />
          <Flex wrap="wrap" gap={4}>
            <HomeCard dataList={mainData} />
          </Flex>
        </Stack>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Random GELEN YEMEK VE ICECEKLER</ModalHeader>
          <Typography style={{ fontWeight: "bold", color: "red",marginLeft:'24px' }}>
            RANDOM VERI SAYI:{randomMealAndCocktailData.length}
          </Typography>
          <ModalCloseButton />
          <ModalBody style={{display:'flex',gap:'10px',width:'100%',flexWrap:'wrap'}}>
            <RandomCard randomMealAndCocktailData={randomMealAndCocktailData} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
