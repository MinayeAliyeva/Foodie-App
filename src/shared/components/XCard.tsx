import React, { useState, useEffect } from "react";
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
  UnorderedList,
  ListItem,
  Flex,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useLazyGetMealDeatailQuery } from "../../store/apis/mealsApi";

export interface IMeal {
  idMeal?: string;
  strMealThumb?: string;
  strMeal?: string;
  strCategory?: string;
  strArea?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
}

export interface IDrink {
  idDrink?: string;
  strDrinkThumb?: string;
  strDrink?: string;
  strCategory?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
}

interface XCardProps {
  title?: string;
  content?: string;
  btnContent?: string;
  image?: string;
  to?: string;
  meal?: IMeal;
  drink?: IDrink;
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
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [getDetail, { data }] = useLazyGetMealDeatailQuery();
  const navigate=useNavigate();
  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem("likes") || "[]");
    const currentItem = meal || drink;
    if (currentItem) {
      const itemString = JSON.stringify(currentItem);
      const liked = likedItems.some(
        (item: IMeal | IDrink) => JSON.stringify(item) === itemString
      );
      setIsLiked(liked);
    }
  }, [meal, drink]);

  const handleLike = () => {
    const currentItem = meal || drink;
    if (!currentItem) return;
    const currentLikes = JSON.parse(localStorage.getItem("likes") || "[]");
    const itemString = JSON.stringify(currentItem);
    const isItemLiked = currentLikes.some(
      (item: IMeal | IDrink) => JSON.stringify(item) === itemString
    );

    const updatedLikes = isItemLiked
      ? currentLikes.filter(
          (item: IMeal | IDrink) => JSON.stringify(item) !== itemString
        )
      : [...currentLikes, currentItem];

    localStorage.setItem("likes", JSON.stringify(updatedLikes));
    setIsLiked(!isItemLiked);
  };
  console.log("detail data", data);

  const itemTitle = meal?.strMeal || drink?.strDrink;
  const itemThumb = meal?.strMealThumb || drink?.strDrinkThumb;
  const itemCategory = meal?.strCategory || drink?.strCategory;
  const itemIngredients = [
    meal?.strIngredient1 || drink?.strIngredient1,
    meal?.strIngredient2 || drink?.strIngredient2,
    meal?.strIngredient3 || drink?.strIngredient3,
  ].filter(Boolean);
  const handleDetail = (id: string | undefined) => {
    if (id) {
      console.log("Detail for ID:", id);
      navigate(`/detail/${id}`); 
    }
  };

  return (
    <Card
      m="10px 0"
      w="280px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="sm"
    >
      <CardBody p="2">
        <Image
          src={itemThumb || image}
          alt={title || "Image"}
          borderRadius="md"
          boxSize="100%"
          objectFit="cover"
          mb="3"
        />
        <Stack height="180px" spacing="2">
          <Heading size="sm">{title || itemTitle}</Heading>
          <Text fontSize="sm" fontWeight="bold">
            Category: {itemCategory || "N/A"}
          </Text>
          {itemIngredients.length > 0 && (
            <>
              <Text fontSize="sm" fontWeight="bold">
                Ingredients:
              </Text>
              <UnorderedList>
                {itemIngredients.map((ingredient, index) => (
                  <ListItem key={index} fontSize="sm">
                    {ingredient}
                  </ListItem>
                ))}
              </UnorderedList>
            </>
          )}
          <Text mt="2" fontSize="sm">
            {content}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter p="2">
        <Flex align="center" justify="space-between" gap="30px">
          <Button
            leftIcon={isLiked ? <FaHeart /> : <FaRegHeart />}
            onClick={handleLike}
            variant="outline"
            border="none"
            colorScheme={isLiked ? "red" : ""}
            size="sm"
          >
            {isLiked ? "Liked" : "Like"}
          </Button>
          <Button onClick={() => handleDetail(meal?.idMeal || drink?.idDrink)}>
            Detail
          </Button>
          {to && (
            <ButtonGroup spacing="1">
              <Link to={to}>
                <Button
                  rightIcon={<FaArrowRightLong />}
                  variant="outline"
                  border="none"
                  color="#000"
                  size="sm"
                >
                  {btnContent}
                </Button>
              </Link>
            </ButtonGroup>
          )}
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default XCard;
