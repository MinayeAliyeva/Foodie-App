import { useGetCoctailsQuery, useGetMealsQuery } from "../../store";
import { useDebounce } from "../../hooks/useDebounce";
import { useState } from "react";
import {
  Box,
  Input,
  Text,
  Flex,
  VStack,
  Stack,
  Heading,
  Divider,
  Card,
  CardBody,
  Image,
} from "@chakra-ui/react"; 

const Home = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { data: mealsData } = useGetMealsQuery(debouncedSearchValue);
  const { data: drinksData } = useGetCoctailsQuery(debouncedSearchValue);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Heading as="h3" size="lg" color="teal.500">
        Tüm Menü
      </Heading>
      <span>Ara:</span>
      <Input
        onChange={handleSearchChange}
        type="text"
        placeholder="Yemek veya içecek ara..."
        value={searchValue}
        mb={6}
        size="lg"
        border="2px solid #ccc"
        borderRadius="md"
        _placeholder={{ color: "gray.500" }}
        _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }}
      />

      <VStack spacing={8} align="start">
        <Stack spacing={4} w="full">
          <Heading as="h3" size="lg" color="teal.500">
            Yemekler
          </Heading>
          <Divider borderColor="teal.300" />
          <Flex wrap="wrap" gap={4}>
            {mealsData?.meals?.length ? (
              mealsData.meals.map((meal) => (
                <Card
                  key={meal.idMeal}
                  w="250px"
                  m={2}
                  boxShadow="md"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    objectFit="cover"
                    w="full"
                    h="150px"
                  />
                  <CardBody p={4}>
                    <Text fontWeight="bold" fontSize="lg">
                      {meal.strMeal}
                    </Text>
                  </CardBody>
                </Card>
              ))
            ) : (
              <Text>No meals found</Text>
            )}
          </Flex>
        </Stack>

        <Stack spacing={4} w="full">
          <Heading as="h3" size="lg" color="teal.500">
            İçecekler
          </Heading>
          <Divider borderColor="teal.300" />
          <Flex wrap="wrap" gap={4}>
            {drinksData?.drinks?.length ? (
              drinksData.drinks.map((drink) => (
                <Card
                  key={drink.idDrink}
                  w="250px"
                  m={2}
                  boxShadow="md"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <Image
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    objectFit="cover"
                    w="full"
                    h="150px"
                  />
                  <CardBody p={4}>
                    <Text fontWeight="bold" fontSize="lg">
                      {drink.strDrink}
                    </Text>
                  </CardBody>
                </Card>
              ))
            ) : (
              <Text>No drinks found</Text>
            )}
          </Flex>
        </Stack>
      </VStack>
    </Box>
  );
};

export default Home;
