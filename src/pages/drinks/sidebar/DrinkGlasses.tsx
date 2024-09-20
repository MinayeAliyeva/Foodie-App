import React, { useEffect, useState } from "react";
import {
  useGetCoctailGlasesListQuery,
  useLazyGetCoctailByGlasesQuery,
} from "../../../store/apis/coctailApi";
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

const DrinkGlasses = ({ getGlassesData }: any) => {
  const [glassesState, setGlassesState] = useState<any>([]);
  const [selectedGlasses, setSelectedGlasses] = useState<string[]>([]);
  const { data: glasesData } = useGetCoctailGlasesListQuery();

  useEffect(() => {
    if (glasesData?.drinks) {
      setGlassesState(glasesData?.drinks);
    }
  }, [glasesData]);
  const handleChangeChecBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedGlasses((prevSelected) =>
      prevSelected.includes(selectedValue)
        ? prevSelected.filter((item) => item !== selectedValue)
        : [...prevSelected, selectedValue]
    );
    getGlassesData({
      value: event.target.value,
      isChecked: event.target.checked,
      key: "g",
    });
  };
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Bakal
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Input placeholder="Axtar" />
        <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {glassesState?.map((glass: any) => (
            <Box key={glass?.strGlass}>
              <Checkbox
                value={glass?.strGlass}
                onChange={handleChangeChecBox}
              >
                {glass?.strGlass}
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
          //   onClick={() =>
          //     getArea(
          //       areaData?.meals,
          //       checkingEquality ? minMealAreaLength : areaData?.meals?.length
          //     )
          //   }
        >
          {/* {checkingEquality ? "Gizle" : "Hepsini Göster"} */}
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DrinkGlasses;
