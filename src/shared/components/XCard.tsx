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
import { ICardData, IFavoriteData } from "../../modules";

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
  itemThumb?: string;
  itemTitle?: string;
  itemCategory?: string;
  itemIngredients?: string[];
  isLiked?: boolean;
  handleLike?: (idMeal: string) => void;
  handleDetail?: (id?: string, key?: "meal" | "drink") => void;
  data: IFavoriteData;
}

const XCard = ({
  title,
  content,
  btnContent = "Learn More",
  to,
  handleLike,
  handleDetail,
  data,
}: XCardProps) => {
  const { itemTitle, itemThumb, itemCategory, itemIngredients, isLiked, id } =
    data ?? {};
  console.log("data", data);

  const onHandleLikeClick = () => {
    handleLike?.(id);
  };
  const onHandleDetail = () => handleDetail?.(data?.id, data?.key);

  return (
    <Card
      m="10px 10px"
      w="280px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="sm"
    >
      <CardBody p="2" display="flex" flexDirection="column">
        <Image
          src={itemThumb}
          alt={title || "Image"}
          borderRadius="md"
          boxSize="100%"
          objectFit="cover"
          mb="3"
        />
        <Stack height="180px" spacing="2">
          <Heading size="sm">{itemTitle}</Heading>
          <Text fontSize="sm" fontWeight="bold">
            Category: {itemCategory || "N/A"}
          </Text>
          {itemIngredients && itemIngredients?.length > 0 ? (
            <>
              <Text fontSize="sm" fontWeight="bold">
                Ingredients:
              </Text>
              <UnorderedList>
                {itemIngredients?.map((ingredient, index) => (
                  <ListItem key={index} fontSize="sm">
                    {ingredient}
                  </ListItem>
                ))}
              </UnorderedList>
            </>
          ) : (
            <></>
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
            onClick={onHandleLikeClick}
            variant="outline"
            border="none"
            colorScheme={isLiked ? "red" : ""}
            size="sm"
          >
            {isLiked ? "Liked" : "Like"}
          </Button>
          <Button onClick={onHandleDetail}>Detail</Button>
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
