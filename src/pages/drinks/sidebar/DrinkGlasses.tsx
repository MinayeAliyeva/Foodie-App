import React, { useEffect, useState } from "react";
import { useGetCoctailGlasesListQuery } from "../../../store/apis/coctailApi";
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

const DrinkGlasses = () => {
  const [glassesState, setGlassesState] = useState<any>([]);
  const { data: glasesData } = useGetCoctailGlasesListQuery();
  useEffect(() => {
    if (glasesData?.drinks) {
      setGlassesState(glasesData?.drinks);
    }
  }, [glasesData]);
  console.log("glases", glassesState);
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
            <Box key={glass?.strGlass
            }>
              <Checkbox
                value={glass?.strGlass}
                // onChange={handleChangeAreaCheckbox}
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
