import React, { useCallback, useEffect, useState } from "react";
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

const DrinkGlasses = ({ getGlassesData }: any) => {
  const [glassesState, setGlassesState] = useState<any>([]);
  const { data: glasesData } = useGetCoctailGlasesListQuery();

  const geGlasses = (glasses?: any, size: number = 5) => {
    if (!glasses) return;
    const data = glasses.slice(0, size);
    setGlassesState(data);
  };

  useEffect(() => {
    if (glasesData?.drinks) {
      geGlasses(glasesData.drinks, 5);
    }
  }, [glasesData]);

  const handleChangeChecBox = (event: React.ChangeEvent<HTMLInputElement>) => {
 
    getGlassesData({
      value: event.target.value,
      isChecked: event.target.checked,
      key: "g",
    });
  };
  const handleChange = useCallback(
    (event: any) => {
      const filteredGlasses = glasesData?.drinks?.filter((glass: any) =>
        glass?.strGlass.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setGlassesState(filteredGlasses);
    },
    [glasesData?.drinks]
  );
  const checkingEquality = glassesState.length === glasesData?.drinks?.length;

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
        <Input placeholder="Axtar" onChange={handleChange} />
        <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {glassesState.map((glass: any) => (
            <Box key={glass?.strGlass}>
              <Checkbox value={glass?.strGlass} onChange={handleChangeChecBox}>
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
          onClick={() =>
            geGlasses(
              glasesData?.drinks,
              checkingEquality ? 5 : glasesData?.drinks?.length
            )
          }
        >
          {checkingEquality ? "Gizle" : "Hepsini Göster"}
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DrinkGlasses;
