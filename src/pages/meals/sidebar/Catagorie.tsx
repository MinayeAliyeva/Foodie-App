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
import React, { FC, useCallback, useEffect, useState } from "react";
import { useGetMealsByCategoriesQuery } from "../../../store/apis/mealsApi";
import { minMealCatagorieLength } from "../data";
import { IMealCategories, IMealCategory } from "../../../modules";

interface IProps {
  getCatagorieData: ({
    value,
    isChecked,
    key,
  }: {
    value: string;
    isChecked?: boolean;
    key?: string;
  }) => void;
}

const Catagorie: FC<IProps> = ({ getCatagorieData }) => {
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
    getCatagorieData({
      value: event.target.value,
      isChecked: event.target.checked,
      key: "s",
    });
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      const filteredCatagories = catagorieData?.categories.filter(
        (catagorie: IMealCategory) =>
          catagorie?.strCategory
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
      );
      setCatagorieState(filteredCatagories);
    },
    [catagorieData?.categories]
  );

  const checkingEquality =
    catagorieState?.length === catagorieData?.categories?.length;

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Catagories
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Input placeholder="Search..." onChange={handleChange} value={value} />
        <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {catagorieState?.map((catagorie) => (
            <Box key={catagorie?.idCategory}>
              <Checkbox
                value={catagorie?.strCategory}
                onChange={handleChangeChecBox}
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
          {checkingEquality ? "Hide" : "Show All"}
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Catagorie;
