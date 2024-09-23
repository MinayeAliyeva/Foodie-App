import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Flex,
  VStack,
  Stack,
  Heading,
  Divider,
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
import { IFavoriteData, IMealCategories } from "../../modules";
import {
  Cocktail,
  useLazyGetRandomcocktailQuery,
} from "../../store/apis/coctailApi";
import RandomCard from "./RandomCard";
import CustomCard from "../../shared/components/CustomCard";
import ImgCardSkeloton from "../../shared/components/skeleton/ImgCardSkeloton";
import { transformCardData } from "../helpers";

const Home = () => {
  const storedFavorites = localStorage.getItem("likes");
  const [mainData, setMainData] = useState<IFavoriteData[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [memoryList, setMemoryList] = useState<any>([]);
  const [searching, setSearching] = useState(false);
  const [drinksDataForCatagories, setDrinksDataForCatagories] = useState<
    Cocktail[]
  >([]);

  const [randomMealAndCocktailData, setRandomMealAndCocktailData] = useState<
    IFavoriteData[]
  >([]);

  const {
    data: mealsData,
    error: mealsError,
    isLoading: mealsLoading,
  } = useGetMealsQuery(debouncedSearchValue, {
    skip: !!debouncedSearchValue.length && debouncedSearchValue.length <= 2,
  });

  const {
    data: drinksData,
    error: drinksError,
    isLoading: drinksLoading,
  } = useGetCoctailsQuery(debouncedSearchValue, {
    skip: !!debouncedSearchValue.length && debouncedSearchValue.length <= 2,
  });
  const homeLoading = mealsLoading || drinksLoading;
  const [getRandomMealData, { data: randomMealData }] =
    useLazyGetRandomMealQueryQuery();
  const [getRandomCocktail, { data: randomCocktailData }] =
    useLazyGetRandomcocktailQuery();

  useEffect(() => {
    if (!randomMealData?.meals && !randomCocktailData?.drinks) return;
    const randomMealDataList: IFavoriteData[] =
      transformCardData(randomMealData?.meals, "meal", storedFavorites) || [];
    const randomCocktailDataList: IFavoriteData[] =
      transformCardData(randomCocktailData?.drinks, "drink", storedFavorites) ||
      [];
    setRandomMealAndCocktailData((prevState: IFavoriteData[]) => {
      const combinedData = [...randomMealDataList, ...randomCocktailDataList];
      const uniqueData = combinedData.filter(
        (newItem) =>
          !prevState.some(
            (prevItem: IFavoriteData) => prevItem.id === newItem.id
          )
      );
      onOpen();
      return [...prevState, ...uniqueData];
    });
  }, [randomMealData?.meals, randomCocktailData?.drinks, storedFavorites]);

  useEffect(() => {
    setDrinksDataForCatagories(drinksData?.drinks!);
  }, [drinksData]);

  useEffect(() => {
    if (mealsData?.meals?.length || drinksData?.drinks?.length) {
      const mealDataList =
        transformCardData(mealsData?.meals, "meal", storedFavorites) || [];
      const drinkDataList =
        transformCardData(drinksData?.drinks, "drink", storedFavorites) || [];
      setMainData([...mealDataList, ...drinkDataList]);
    }else{
      setMainData([]);
    }
  }, [drinksData?.drinks, mealsData?.meals]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearching(true);
    setSearchValue(event.target.value);
    setMemoryList(
      (prevs: any) => debouncedSearchValue ?? [...prevs, searchValue]
    );
  };
  const onClickGetRandomMealData = () => {
    getRandomMealData();
  };
  const onClickGetRandomCocktailData = () => {
    getRandomCocktail();
  };
  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Heading as="h3" size="lg" color="teal.500" mb={4}>
        All Menu
      </Heading>
      <Flex mb={6} align="center" justify="space-between">
        <Input
          onChange={handleSearchChange}
          type="text"
          placeholder="Search for food or drinks..."
          value={searchValue}
          size="lg"
          border="2px solid #ccc"
          borderRadius="md"
          _placeholder={{ color: "gray.500" }}
          _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }}
          width="80%"
        />

        <Button onClick={onClickGetRandomMealData} ml={4} colorScheme="teal">
        Random Meal
        </Button>
        <Button
          ml={4}
          colorScheme="teal"
          onClick={onClickGetRandomCocktailData}
        >
        Random Cocktail
        </Button>
      </Flex>

      {searchValue.length > 0 && searchValue.length < 2 && (
        <Typography style={{ color: "red", fontWeight: "bold" }} color="red">
         You must enter at least 2 characters
        </Typography>
      )}
      <VStack spacing={8} align="start">
        <Stack spacing={4} w="full">
          <Divider borderColor="teal.300" />
          <Flex wrap="wrap" gap={4}>
            {homeLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <ImgCardSkeloton key={index} />
              ))
            ) : (
              <CustomCard dataList={mainData} />
            )}
          </Flex>
        </Stack>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>MEALS AND DRINKS FROM Random</ModalHeader>
          <Typography
            style={{ fontWeight: "bold", color: "red", marginLeft: "24px" }}
          >
          RANDOM DATA NUMBER:{randomMealAndCocktailData.length}
          </Typography>
          <ModalCloseButton />
          <ModalBody
            style={{
              display: "flex",
              gap: "10px",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
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
