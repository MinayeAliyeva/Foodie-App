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
import { useState } from "react";

export const MealIngredient = ({ getIngredientData }: any) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const { data: ingredientData } = useGetIngredientsQuery();
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(selectedValue)
        ? prevSelected.filter((item) => item !== selectedValue)
        : [...prevSelected, selectedValue]
    );
    //getIngredientData
    getIngredientData(
      selectedIngredients.includes(selectedValue)
        ? selectedIngredients.filter((item) => item !== selectedValue)
        : [...selectedIngredients, selectedValue]
    );
  };
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
            return (
              <Box key={ingredient?.idIngredient}>
                <Checkbox
                  onChange={handleCheckboxChange}
                  value={ingredient?.strIngredient}
                >
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
