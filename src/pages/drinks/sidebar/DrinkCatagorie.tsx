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
import { useGetCoctailCatagorieListQuery } from "../../../store/apis/coctailApi";

const DrinkCatagorie = ({ getCatagorieData }: any) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const { data: drinkCatagories } = useGetCoctailCatagorieListQuery<any>();
  const [catagorieState, setCatagorieState] = useState<any>([]);
  useEffect(() => {
    if (drinkCatagories?.drinks) {
      getCatagorie(drinkCatagories.drinks);
    }
  }, [drinkCatagories]);
  const handleChangeChecBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    console.log("test");

    console.log("selectedValue", selectedValue);

    setSelectedCategories((prevSelected) =>
      prevSelected.includes(selectedValue)
        ? prevSelected.filter((item) => item !== selectedValue)
        : [...prevSelected, selectedValue]
    );
    getCatagorieData({
      value: event.target.value,
      isChecked: event.target.checked,
      key: "s",
    });
  };
  const getCatagorie = (categories?: any, size: number = 5) => {
    console.log("categories", categories);
    if (!categories) return;
    const data = categories?.slice(0, size);
    setCatagorieState(data);
  };
  console.log("drinkCatagories", drinkCatagories);
  const handleChange = (event: any) => {
    setValue(event.target.value);
    const filteredCatagories = drinkCatagories?.drinks.filter(
      (catagorie: any) =>
        catagorie?.strCategory
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setCatagorieState(filteredCatagories);
  };
  const checkingEquality =
    catagorieState?.length === drinkCatagories?.drinks?.length;

  console.log("checkingEquality", checkingEquality);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Kategoriler
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Input placeholder="Ara" onChange={handleChange} />
        <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {catagorieState?.map((catagorie: any) => (
            <Box key={catagorie?.idCategory}>
              <Checkbox
                value={catagorie?.strCategory}
                onChange={handleChangeChecBox}
                // isChecked={selectedCategories.includes(
                //   catagorie?.strCategory || ""
                // )}
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
              drinkCatagories?.drinks,
              checkingEquality ? 5 : drinkCatagories?.drinks?.length
            )
          }
        >
              {checkingEquality ? "Gizle" : "Hepsini Göster"}
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DrinkCatagorie;
