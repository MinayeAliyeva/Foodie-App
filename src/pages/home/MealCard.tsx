import { CardBody } from "@chakra-ui/react";
import { Text, Image, Card } from "@chakra-ui/react";
import { IMeal } from "../../modules";

const MealCard = ({ meal }: IMeal) => {
  return (
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
  );
};

export default MealCard;
