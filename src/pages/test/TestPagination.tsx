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
import {
  useGetMealsByCategoriesQuery,
  useLazyGetMealsQuery,
  useLazyGetRandomMealQueryQuery,
} from "../../store/apis/mealsApi";
import { Typography } from "antd";
import { IFavoriteData, IMealCategories } from "../../modules";
import {
  Cocktail,
  useGetCoctailCatagorieListQuery,
  useLazyGetCoctailsQuery,
  useLazyGetRandomcocktailQuery,
} from "../../store/apis/coctailApi";
import CustomCard from "../../shared/components/CustomCard";
import ImgCardSkeloton from "../../shared/components/skeleton/ImgCardSkeloton";
import RandomCard from "../home/RandomCard";
import XPagination from "../../shared/components/XPagination";
import { fetchData, transformCardData } from "../helpers";

const TestHome = () => {
  const storedFavorites = localStorage.getItem("likes");
  const [mainData, setMainData] = useState<IFavoriteData[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [memoryList, setMemoryList] = useState<any>([]);
  const [searching, setSearching] = useState(false);
  const [allData, setAllData] = useState<any>([]);

  console.log("allData", allData);

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
  const [triggerMeals, { data: mealsStateData }] = useLazyGetMealsQuery();

  const {
    data: drinksData,
    error: drinksError,
    isLoading: drinksLoading,
  } = useGetCoctailsQuery(debouncedSearchValue, {
    skip: !!debouncedSearchValue.length && debouncedSearchValue.length <= 2,
  });

  const [triggerDrinks] = useLazyGetCoctailsQuery();
  const homeLoading = mealsLoading || drinksLoading;
  const [getRandomMealData, { data: randomMealData }] =
    useLazyGetRandomMealQueryQuery();
  const [getRandomCocktail, { data: randomCocktailData }] =
    useLazyGetRandomcocktailQuery();

  //meal catagories
  //0,5 || 5,10 || 10,15
  const [page, setPage] = useState({ start: 0, end: 3 });
  const { data: catagorieData } = useGetMealsByCategoriesQuery<{
    data: IMealCategories;
  }>();
  const { data: drinkCatagories } = useGetCoctailCatagorieListQuery<any>();
  console.log("drinkCatagories", drinkCatagories);
  const [obj, setObj] = useState({ meals: [], drinks: [] });
  useEffect(() => {
    if (catagorieData?.categories.length || drinkCatagories?.drinks.length) {
      const data: any = [];
      console.log("data", data);

      fetchData({
        data: catagorieData?.categories?.slice(page?.start, page?.end),
        trigger: triggerMeals,
        key: "mealsCatagory",
      }).then((res: any) => {
        console.log("resMeals", res);
        // const transformedData = transformCardData(res, "meal", storedFavorites);
        // console.log("transformedData", transformedData);
        // data.push(...transformedData);
        setObj((prev: any) => ({ ...prev, meals: res }));
        // setAllData(transformedData);
      });

      fetchData({
        data: drinkCatagories?.drinks?.slice(page?.start, page?.end),
        trigger: triggerDrinks,
        key: "drinksCatagory",
      }).then((res: any) => {
        console.log("resDrinks", res);
        // const transformedData = transformCardData(
        //   res,
        //   "drink",
        //   storedFavorites
        // );
        // console.log("transformedData", transformedData);
        // setAllData(transformedData);
        // data.push(...transformedData);
        setObj((prev: any) => ({ ...prev, drinks: res }));
      });
      //   setAllData(data);
    }
  }, [catagorieData?.categories, page, triggerMeals, drinkCatagories?.drinks]);
  useEffect(() => {
    if (obj?.meals.length || obj?.drinks?.length) {
      const mealDataList =
        transformCardData(obj?.meals, "meal", storedFavorites) || [];
      const drinkDataList =
        transformCardData(obj?.drinks, "drink", storedFavorites) || [];
      setAllData([...mealDataList, ...drinkDataList]);
      console.log("mealDataList", mealDataList);
      console.log("drinkDataList", drinkDataList);
    }
  }, [obj]);

  console.log("LENGTH", allData?.length);
  const getPageData = (p: number) => {
    // console.log("page", page);
    switch (p) {
      case 1:
        setPage({ start: 0, end: 3 });
        break;
      case 2:
        setPage({ start: 3, end: 6 });
        break;
      case 3:
        setPage({ start: 6, end: 9 });
        break;
      case 4:
        setPage({ start: 9, end: 12 });
        break;
      case 5:
        setPage({ start: 12, end: 15 });
        break;
      default:
        setPage({ start: 0, end: 3 });
        break;
    }
  };

  useEffect(() => {
    if (!randomMealData?.meals && !randomCocktailData?.drinks) return;
    const randomMealDataList: IFavoriteData[] =
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

    const randomCocktailDataList: IFavoriteData[] =
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

  //   useEffect(() => {
  //     const mealDataList =
  //       (mealsData?.meals?.map((meal) => ({
  //         itemTitle: meal?.strMeal,
  //         itemThumb: meal?.strMealThumb,
  //         itemCategory: meal?.strCategory,
  //         itemIngredients: [
  //           meal?.strIngredient1,
  //           meal?.strIngredient2,
  //           meal?.strIngredient3,
  //         ].filter(Boolean),
  //         id: meal?.idMeal,
  //         isLiked: !!JSON.parse(storedFavorites!)?.find(
  //           (favorie: any) => favorie?.id === meal?.idMeal
  //         ),
  //         key: "meal",
  //       })) as any) ?? [];

  //     const drinkDataList =
  //       (drinksData?.drinks?.map((drink) => ({
  //         itemTitle: drink?.strDrink,
  //         itemThumb: drink?.strDrinkThumb,
  //         itemCategory: drink?.strCategory,
  //         itemIngredients: [
  //           drink?.strIngredient1,
  //           drink?.strIngredient2,
  //           drink?.strIngredient3,
  //         ].filter(Boolean),
  //         id: drink?.idDrink,
  //         isLiked: !!JSON.parse(storedFavorites!)?.find(
  //           (favorie: any) => favorie?.id === drink?.idDrink
  //         ),
  //         key: "drink",
  //       })) as any) ?? [];
  useEffect(() => {
    const mealDataList =
      (allData?.map((meal: any) => ({
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

    setMainData([...mealDataList]);
  }, [allData, storedFavorites]);

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
      {/* <Heading as="h3" size="lg" color="teal.500" mb={4}>
        Tüm Menü
      </Heading> */}
      <XPagination getPageData={getPageData} data={allData} />
      <h1 style={{ color: "red" }}>{allData?.length}</h1>
      <VStack spacing={8} align="start">
        <Stack spacing={4} w="full">
          <Divider borderColor="teal.300" />
          <Flex wrap="wrap" gap={4}>
            {homeLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <ImgCardSkeloton key={index} />
              ))
            ) : (
              <CustomCard dataList={allData} />
            )}
          </Flex>
        </Stack>
      </VStack>
      {/* <Flex mb={6} align="center" justify="space-between">
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

        <Button onClick={onClickGetRandomMealData} ml={4} colorScheme="teal">
          Random Bir Yemek
        </Button>
        <Button
          ml={4}
          colorScheme="teal"
          onClick={onClickGetRandomCocktailData}
        >
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
          <ModalHeader>Random GELEN YEMEK VE ICECEKLER</ModalHeader>
          <Typography
            style={{ fontWeight: "bold", color: "red", marginLeft: "24px" }}
          >
            RANDOM VERI SAYI:{randomMealAndCocktailData.length}
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
      </Modal> */}
    </Box>
  );
};

export default TestHome;
