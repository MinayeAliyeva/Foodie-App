import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Box,
  UnorderedList,
  ListItem,
  Flex,
} from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";

interface XCardProps {
  title?: string;
  content?: string;
  btnContent?: string;
  image?: string;
  to?: string;
  meal?: {
    idMeal?: string;
    strMealThumb?: string;
    strMeal?: string;
    strCategory?: string;
    strArea?: string;
    strIngredient1?: string;
    strIngredient2?: string;
    strIngredient3?: string;
  };
  drink?: {
    idDrink?: string;
    strDrinkThumb?: string;
    strDrink?: string;
    strCategory?: string;
    strIngredient1?: string;
    strIngredient2?: string;
    strIngredient3?: string;
  };
}

const XCard = ({
  title,
  content,
  btnContent = "Learn More",
  image,
  to,
  meal,
  drink,
}: XCardProps) => {
  const handleLike = () => {
    console.log("like");
  };
  const [isLiked, setIsLiked] = useState(false);

  // Hem meal hem de drink olabilir. Ortak olan ya da varsa kullanılması gereken özellikleri belirleyelim.
  const itemTitle = meal?.strMeal || drink?.strDrink;
  const itemThumb = meal?.strMealThumb || drink?.strDrinkThumb;
  const itemCategory = meal?.strCategory || drink?.strCategory;
  const itemIngredients = [
    meal?.strIngredient1 || drink?.strIngredient1,
    meal?.strIngredient2 || drink?.strIngredient2,
    meal?.strIngredient3 || drink?.strIngredient3,
  ].filter(Boolean);

  return (
    <Card maxW="xl" padding="10px">
      {meal || drink ? (
        <Box>
          <CardBody>
            <Image src={itemThumb} alt={title || "Image"} borderRadius="md" />
            <Stack mt="6" spacing="3">
              <Heading size="md">{title || itemTitle}</Heading>
              <Text fontWeight="bold">Category: {itemCategory || "N/A"}</Text>
              <Text fontWeight="bold">Ingredients:</Text>
              <UnorderedList>
                {itemIngredients.map((ingredient, index) => (
                  <ListItem key={index}>{ingredient}</ListItem>
                ))}
              </UnorderedList>
            </Stack>
            <Text mt="4">{content}</Text>
          </CardBody>
          <Divider />
          <CardFooter>
            <Flex align="center" justify="space-between" width="100%">
              <Button
                leftIcon={isLiked ? <GrFavorite color="red" /> : <GrFavorite />}
                onClick={handleLike}
                variant="outline"
                border="none"
              >
                {isLiked ? "Unlike" : "Like"}
              </Button>

              <Button
                onClick={() => console.log("Show More Clicked")}
                variant="outline"
                border="none"
              >
                Show More
              </Button>
            </Flex>
          </CardFooter>
        </Box>
      ) : (
        <Box>
          <CardBody>
            <Image src={image} alt={title || "Image"} borderRadius="md" />
            <Stack mt="6" spacing="3">
              <Heading size="md">{title}</Heading>
            </Stack>
            <Text mt="4">{content}</Text>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              {to && (
                <Link to={to}>
                  <Button
                    rightIcon={<FaArrowRightLong />}
                    variant="outline"
                    border="none"
                  >
                    {btnContent}
                  </Button>
                </Link>
              )}
            </ButtonGroup>
          </CardFooter>
        </Box>
      )}
    </Card>
  );
};

export default XCard;
