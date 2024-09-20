import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useLazyGetCoctailDetailQuery } from "../../../store/apis/coctailApi";

const DrinkDetail = () => {
  const [
    getCoctailDetail,
    { data: coctailData, isLoading: coctailLoading, error: coctailError },
  ] = useLazyGetCoctailDetailQuery();

  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams<{ id: string }>();

  const detailCoctail = coctailData?.drinks;

  useEffect(() => {
    if (id) {
      getCoctailDetail(id, true);
    }
  }, [id, getCoctailDetail]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  if (coctailLoading)
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

  if (coctailError)
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
    <Box padding="20px" maxWidth="600px" margin="auto" height="100vh">
      {detailCoctail ? (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          padding="20px"
          boxShadow="lg"
          mt="20px"
        >
          <Heading as="h1" size="xl" textAlign="center" mb="20px">
            {detailCoctail[0].strDrink}
          </Heading>
          <Image
            src={detailCoctail[0].strDrinkThumb}
            alt={detailCoctail[0].strDrink}
            borderRadius="lg"
            mb="20px"
          />
          <VStack spacing={4} align="start">
            <Box>
              <Text fontWeight="bold">Instructions:</Text>
              <Text>{detailCoctail[0].strInstructions}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Category:</Text>
              <Text>{detailCoctail[0].strCategory}</Text>
            </Box>
          </VStack>
        </Box>
      ): (
        <Text>Drink details not found</Text>
      )}
    </Box>
  );
};

export default DrinkDetail;
