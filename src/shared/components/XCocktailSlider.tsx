import Slider from "react-slick";
import {
  Box,
  Image,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";
import { settings } from "../../constands";
import { useGetCoctailsQuery } from "../../store/apis/coctailApi";

export const XCocktailSlider = () => {
  const { data, error, isLoading } = useGetCoctailsQuery();
  console.log("data", data);

  const overlayTextSize = useBreakpointValue({ base: "sm", md: "md" });

  if (isLoading) {
    return (
      <Center height="100vh" width="100%">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error" variant="solid" borderRadius="md">
        <AlertIcon />
        Error occurred
      </Alert>
    );
  }

  return (
    <Slider {...settings}>
      {data?.drinks.map((drink: any) => (
        <Box
          margin="0 10px"
          key={drink.idDrink}
          position="relative"
          overflow="hidden"
          borderRadius="lg"
          boxShadow="lg"
          _hover={{
            "& .meal-info": {
              opacity: 1,
              transform: "translateY(0)",
            },
          }}
        >
          <Image
            src={drink?.strDrinkThumb}
            alt={drink?.strDrink}
            width="100%"
            height="auto"
            objectFit="cover"
            margin="10px"
          />
          <Box
            className="meal-info"
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            padding="6"
            background="rgba(0, 0, 0, 0.6)"
            color="white"
            opacity="0"
            transform="translateY(100%)"
            transition="all 0.3s ease"
          >
            <Text fontWeight="bold" fontSize={overlayTextSize} mb="2">
              {drink?.strDrink}
            </Text>
            <Text fontSize={overlayTextSize} mb="2">
              <strong>Category:</strong> {drink?.strCategory}
            </Text>
            <Text fontSize={overlayTextSize} noOfLines={3}>
              {drink?.strInstructions}
            </Text>
          </Box>
        </Box>
      ))}
    </Slider>
  );
};
