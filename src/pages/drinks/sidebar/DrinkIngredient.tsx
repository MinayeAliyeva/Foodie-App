import { Box } from "@chakra-ui/react";
import { Select, Typography } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import {  useState } from "react";
import { useGetCoctailIngredientsListQuery } from "../../../store/apis/coctailApi";
const { Option } = Select;
const DrinkIngredient = ({getIngredientData}:any) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const { data: ingredientData } = useGetCoctailIngredientsListQuery();

  const handleChange = (values: string[]) => {
    getIngredientData(values);
    setSelectedValues(values);
  };

  return (
    <Box style={{ paddingLeft: "15px", marginTop: "5px" }}>
      <Typography style={{ fontWeight: "bold", fontSize: "18px" }}>
        Ingredient
      </Typography>
      <Select
        mode="multiple"
        style={{
          width: "95%",
          minHeight: "40px",
          color: "#000",
          fontSize: "18px",
          margin: "10px 0",
        }}
        placeholder={"Ingredient Axtar"}
        suffixIcon={<IoSearchOutline />}
        onChange={handleChange}
        value={selectedValues}
        showSearch={true}
      >
        {ingredientData?.drinks?.map((ingredient: any) => (
          <Option
            key={ingredient?.strIngredient1}
            value={ingredient?.strIngredient1}
          >
            {ingredient?.strIngredient1}
          </Option>
        ))}
      </Select>
    </Box>
  );
};

export default DrinkIngredient;
