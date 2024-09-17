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
import React, { useEffect, useState } from "react";
import { useGetMealsAreaQuery } from "../../../store/apis/mealsApi";

export const MealArea = ({ getAreaData }: any) => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [areasState, setAreasState] = useState<any>([]);
  const [value, setValue] = useState("");
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setValue(searchValue);

    const filteredAreas = areaData?.meals?.filter((area: any) =>
      area?.strArea.toLowerCase().includes(searchValue)
    );

    setAreasState(filteredAreas || []);
  };
  useEffect(() => {
    if (areaData?.meals) {
      setAreasState(areaData.meals);
    }
  }, [areaData]);
  const getArea = (arg: any) => {};

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
        <Input placeholder="Axtar" onChange={handleChange} />
        <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {areasState?.map((area: any) => (
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
          onClick={() => getArea(areaData?.meals)}
        >
          Hamısını göstər
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default MealArea;
