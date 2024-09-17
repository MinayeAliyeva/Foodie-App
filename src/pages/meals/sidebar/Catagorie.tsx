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
import { IMealCategories, IMealCategory, useGetMealsByCategoriesQuery } from "../../../store/apis/mealsApi";
import { minMealCatagorieLength } from "../data";

interface IProps {
  getCatagorieData: ({value, isChecked, key }:{value: string, isChecked?: boolean, key?: string}) => void;
}

const Catagorie: FC<IProps> = ({ getCatagorieData }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: catagorieData } = useGetMealsByCategoriesQuery<{
    data: IMealCategories;
  }>();
  const [catagorieState, setCatagorieState] = useState<IMealCategory[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (catagorieData?.categories) {
      getCatagorie(catagorieData.categories);
    }
  }, [catagorieData]);

  const getCatagorie = (categories?: IMealCategory[], size: number = 5) => {
    if (!categories) return;
    const data = categories?.slice(0, size);
    setCatagorieState(data);
  };

  const handleChangeChecBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    console.log('event', event);
    
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(selectedValue)
        ? prevSelected.filter((item) => item !== selectedValue)
        : [...prevSelected, selectedValue]
    );
    getCatagorieData({
      value: event.target.value, 
      isChecked: event.target.checked, key: 's'});
    // getCatagorieData(
    //   selectedCategories.includes(selectedValue)
    //     ? selectedCategories.filter((item) => item !== selectedValue)
    //     : [...selectedCategories, selectedValue]
    // );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    const filteredCatagories = catagorieData?.categories.filter((catagorie) =>
      catagorie?.strCategory
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setCatagorieState(filteredCatagories);
  };

  const checkingEquality =
    catagorieState?.length === catagorieData?.categories?.length;

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
        <Input placeholder="Ara" onChange={handleChange} value={value} />
        <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {catagorieState?.map((catagorie) => (
            <Box key={catagorie?.idCategory}>
              <Checkbox
                value={catagorie?.strCategory}
                onChange={handleChangeChecBox}
                isChecked={selectedCategories.includes(
                  catagorie?.strCategory || ""
                )}
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
          {checkingEquality ? "Gizle" : "Hepsini Göster"}
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Catagorie;
