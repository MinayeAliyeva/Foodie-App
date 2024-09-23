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
import React, { useCallback, useEffect, useState } from "react";
import { useGetMealsAreaQuery } from "../../../store/apis/mealsApi";
import { minMealAreaLength } from "../data";

export const MealArea = ({ getAreaData }: any) => {
  const [areasState, setAreasState] = useState<any>([]);
  const { data: areaData } = useGetMealsAreaQuery();

  useEffect(() => {
    if (areaData?.meals) {
      setAreasState(areaData.meals);
    }
  }, [areaData]);
  const handleChangeAreaCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    getAreaData({
      value: event.target.value,
      isChecked: event.target.checked,
      key: "a",
    });
  };
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value.toLowerCase();
      const filteredAreas = areaData?.meals?.filter((area: any) =>
        area?.strArea.toLowerCase().includes(searchValue)
      );

      setAreasState(filteredAreas || []);
    },
    [areaData?.meals]
  );
  useEffect(() => {
    if (areaData?.meals) {
      getArea(areaData.meals);
    }
  }, [areaData?.meals]);
  const getArea = (areas: any, size: number = 5) => {
    if (!areas) return;
    const data = areas?.slice(0, size);
    setAreasState(data);
  };
  const checkingEquality = areasState?.length === areaData?.meals?.length;

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
          onClick={() =>
            getArea(
              areaData?.meals,
              checkingEquality ? minMealAreaLength : areaData?.meals?.length
            )
          }
        >
          {checkingEquality ? "Gizle" : "Hepsini Göster"}
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default MealArea;
