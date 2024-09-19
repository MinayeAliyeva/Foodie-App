import { Box } from "@chakra-ui/react";
import { Select, Typography } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { useGetIngredientsQuery } from "../../../store/apis/mealsApi";
import { FC, useState } from "react";

const { Option } = Select;

interface IProps {
  getIngredientData: (values: string[]) => void;
}
export const MealIngredient: FC<IProps> = ({ getIngredientData }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const { data: ingredientData } = useGetIngredientsQuery();

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
        {ingredientData?.meals?.map((ingredient: any) => (
          <Option
            key={ingredient?.strIngredient}
            value={ingredient?.strIngredient}
          >
            {ingredient?.strIngredient}
          </Option>
        ))}
      </Select>
    </Box>
  );
};

export default MealIngredient;
