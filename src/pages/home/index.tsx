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

const MealCard = lazy(() => import("./MealCard"));
const DrinkCard = lazy(() => import("./DrinkCard"));

const Home = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [randomData, setRandomData] = useState<any>(null);
  const debouncedSearchValue = useDebounce(searchValue, 1000);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searching, serSearching] = useState(false);

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

  const [trigger, { data }] = useLazyGetRandomMealQueryQuery<any>();
  useEffect(() => {
    if (data) {
      setRandomData(data);
      onOpen();
    }
    if (searching) {
      serSearching(false);
    }
  }, [data, onOpen, searching]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    serSearching(true);
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
        <Button onClick={() => trigger()} ml={4} colorScheme="teal">
          Random Bir Yemek Ya İçecek
        </Button>
      </Flex>
      <VStack spacing={8} align="start">
        <Stack spacing={4} w="full">
          <Heading as="h3" size="lg" color="teal.500">
            Yemekler
          </Heading>
          <Divider borderColor="teal.300" />
          <Flex wrap="wrap" gap={4}>
            {mealsLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} height="200px" width="100%" />
              ))
            ) : mealsError ? (
              <Text color="red.500">Error loading meals</Text>
            ) : mealsData?.meals?.length ? (
              <Suspense
                fallback={
                  <Stack spacing={4}>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Skeleton key={index} height="200px" width="100%" />
                    ))}
                  </Stack>
                }
              >
                {mealsData.meals.map((meal) => (
                  <MealCard key={meal.idMeal} meal={meal} />
                ))}
              </Suspense>
            ) : (
              <Text color="gray.500">No meals found</Text>
            )}
          </Flex>
        </Stack>

        <Stack spacing={4} w="full">
          <Heading as="h3" size="lg" color="teal.500">
            İçecekler
          </Heading>
          <Divider borderColor="teal.300" />
          <Flex wrap="wrap" gap={4}>
            {drinksLoading ? (
              Array.from({ length: 25 }).map((_, index) => (
                <Skeleton key={index} height="200px" width="100%" />
              ))
            ) : drinksError ? (
              <Text color="red.500">Error loading drinks</Text>
            ) : drinksData?.drinks?.length ? (
              <Suspense
                fallback={
                  <Stack spacing={4}>
                    {Array.from({ length: 25 }).map((_, index) => (
                      <Skeleton key={index} height="200px" width="100%" />
                    ))}
                  </Stack>
                }
              >
                {drinksData.drinks.map((drink) => (
                  <DrinkCard key={drink.idDrink} drink={drink} />
                ))}
              </Suspense>
            ) : (
              <Text color="gray.500">No drinks found</Text>
            )}
          </Flex>
        </Stack>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Random Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {randomData?.meals?.length ? (
              <Suspense fallback={<Skeleton height="200px" width="100%" />}>
                {randomData.meals.map((meal: any) => (
                  <MealCard key={meal.idMeal} meal={meal} />
                ))}
              </Suspense>
            ) : (
              <Text>Loading...</Text>
            )}
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
