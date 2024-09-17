import React from "react";
import { Card, CardBody, Image, Text } from "@chakra-ui/react";
import { IDrink } from "../../modules";
const DrinkCard = ({ drink }: IDrink) => {
  return (
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
  );
};

export default DrinkCard;
