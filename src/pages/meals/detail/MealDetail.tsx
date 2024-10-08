import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useLazyGetMealDetailQuery } from "../../../store/apis/mealsApi";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MealDetail = () => {
  const [
    getMealDetail,
    { data: mealData, isLoading: mealLoading, error: mealError },
  ] = useLazyGetMealDetailQuery();

  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams<{ id: string }>();

  const detailMeal = mealData?.meals;

  useEffect(() => {
    if (id) {
      getMealDetail(id, true);
    }
  }, [id, getMealDetail]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  if (mealLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );

  if (mealError)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert status="error" variant="solid">
          <AlertIcon />
          Error loading details
        </Alert>
      </Box>
    );

  return (
    <Box padding="20px" maxWidth="600px" margin="auto" minHeight="100vh">
      {detailMeal ? (
        <Box borderWidth="1px" borderRadius="lg" padding="20px" boxShadow="lg">
          <Heading as="h1" size="xl" textAlign="center" mb="20px">
            {detailMeal[0].strMeal}
          </Heading>
          <Image
            src={detailMeal[0].strMealThumb}
            alt={detailMeal[0].strMeal}
            borderRadius="lg"
            mb="20px"
          />
          <VStack spacing={4} align="start">
            <Box>
              <Text fontWeight="bold">Instructions:</Text>
              <Text>
                {isExpanded
                  ? detailMeal[0].strInstructions
                  : detailMeal[0].strInstructions.length > 200
                    ? `${detailMeal[0].strInstructions.slice(0, 200)}...`
                    : detailMeal[0].strInstructions}
              </Text>
              {detailMeal[0].strInstructions.length > 200 && (
                <Button
                  variant="link"
                  colorScheme="blue"
                  onClick={handleToggle}
                  mt={2}
                >
                  {isExpanded ? "Read less" : "Read more"}
                </Button>
              )}
            </Box>
            <Box>
              <Text fontWeight="bold">Area:</Text>
              <Text>{detailMeal[0].strArea}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Category:</Text>
              <Text>{detailMeal[0].strCategory}</Text>
            </Box>
            <Box>
              <Link style={{ color: "red" }} to={detailMeal[0]?.strYoutube}>
                Youtube Link{" "}
              </Link>
            </Box>
          </VStack>
        </Box>
      ) : (
        <Text>Meal details not found</Text>
      )}
    </Box>
  );
};

export default MealDetail;
