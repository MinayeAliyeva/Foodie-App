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
import {
  useGetCoctailCatagorieListQuery,
} from "../../../store/apis/coctailApi";

const DrinkCatagorie = ({getCatagorieData}: any) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: drinkCatagories } = useGetCoctailCatagorieListQuery<any>();
  const handleChangeChecBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;

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
        <Input placeholder="Ara" />
        <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {drinkCatagories?.drinks?.map((catagorie: any) => (
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
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DrinkCatagorie;
