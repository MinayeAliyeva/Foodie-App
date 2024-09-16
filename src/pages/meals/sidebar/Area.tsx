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
import React, { useState } from "react";
import { useGetMealsAreaQuery } from "../../../store/apis/mealsApi";

export const MealArea = ({ getCatagorieData, getAreaData }: any) => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const { data: areaData } = useGetMealsAreaQuery();


  const handleChangeAreaCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectedAreas((prevSelected) =>
      prevSelected.includes(selectedValue)
        ? prevSelected.filter((item) => item !== selectedValue)
        : [...prevSelected, selectedValue]
    );
    getAreaData(
      selectedAreas.includes(selectedValue)
        ? selectedAreas.filter((item) => item !== selectedValue)
        : [...selectedAreas, selectedValue]
    );
  };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Ərazi
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Input placeholder="Axtar" />
        <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {areaData?.meals?.map((area: any) => (
            <Box key={area?.strArea}>
              <Checkbox
                value={area?.strArea}
                onChange={handleChangeAreaCheckbox}
              >
                {area?.strArea}
              </Checkbox>
            </Box>
          ))}
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

export default MealArea;
