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
import React, { FC, useEffect, useState } from "react";
import {
  IMealCatagorie,
  IMealCatagories,
  useGetMealsByCatagoriesQuery,
} from "../../../store/apis/mealsApi";
import { minMealCatagorieLength } from "../data";

interface IProps {
  getCatagorieData: (catagorie: string) => void;
}
const Catagorie: FC<IProps> = ({ getCatagorieData }) => {
  const [selectedCatagorie, setSelectedCatagorie] = useState<string | null>(
    null
  );
  const { data: catagorieData } = useGetMealsByCatagoriesQuery<{
    data: IMealCatagories;
  }>();
  const [catagorieState, setCatagorieState] = useState<IMealCatagorie[]>([]);
  const [value, setValue] = useState("");

useEffect(() => {
  if (catagorieData?.categories) {
    getCatagorie(catagorieData.categories);
  }
}, [catagorieData]);


  const getCatagorie = (categories?: IMealCatagorie[], size: number = 5) => {
    if (!categories) return;
    const data = categories?.slice(0, size);
    setCatagorieState(data);
  };

  const handleChangeChecBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;

    if (selectedCatagorie === selectedValue) {
      setSelectedCatagorie(null);
      getCatagorieData("");
    } else {
      setSelectedCatagorie(selectedValue);
      getCatagorieData(selectedValue);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.toLowerCase());
  };

  const filteredCatagories = catagorieState.filter((catagorie) =>
    catagorie?.strCategory.toLowerCase().includes(value)
  );

  const checkingEquality =
    catagorieState?.length === catagorieData?.categories?.length;

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Katagoriler
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Input placeholder="Axtar" onChange={handleChange} value={value} />
        <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filteredCatagories?.map((catagorie) => (
            <Box key={catagorie?.idCategory}>
              <Checkbox
                value={catagorie?.strCategory}
                onChange={handleChangeChecBox}
                isChecked={selectedCatagorie === catagorie?.strCategory}
              >
                {catagorie?.strCategory}
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
            getCatagorie(
              catagorieData?.categories,
              checkingEquality
                ? minMealCatagorieLength
                : catagorieData?.categories?.length
            )
          }
        >
          {checkingEquality ? "Gizle" : "Hamısını göstər"}
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Catagorie;
