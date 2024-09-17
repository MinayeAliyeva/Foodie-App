import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Input,
} from "@chakra-ui/react";
import { useGetIngredientsQuery } from "../../../store/apis/mealsApi";

export const MealIngredient = () => {
  const { data: ingredientData } = useGetIngredientsQuery();

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Inqredient
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Input placeholder="Axtar" />
        <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {ingredientData?.meals?.map((ingredient: any) => {
            //console.log("ingredient", ingredient);

            return (
              <Box key={ingredient?.idIngredient}>
                <Checkbox value={ingredient?.strIngredient}>
                  {ingredient?.strIngredient}
                </Checkbox>
              </Box>
            );
          })}
        </Box>
        <Button
          style={{
            border: "none",
            backgroundColor: "transparent",
            color: "#c62828",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          Hamısını göstər
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default MealIngredient;
