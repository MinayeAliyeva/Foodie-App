import { FC } from "react";
import { Select } from "antd";
import { useGetIngredientsQuery } from "../../store/apis/mealsApi";
import { IoSearchOutline } from "react-icons/io5";
const { Option } = Select;
interface IProps {
  getIngredientData: ({
    value,
    isChecked,
    key,
  }: {
    value: string;
    isChecked?: boolean;
    key?: string;
  }) => void;
}

const SelecBox: FC<IProps> = ({ getIngredientData }) => {
  const { data: ingredientData } = useGetIngredientsQuery();

  return (
    <Select
      mode="multiple"
      style={{
        width: "95%",
        minHeight: "40px",
        color: "#000",
        fontSize: "18px",
        margin: "10px 0",
      }}
      placeholder={"Ingradient Axtar"}
      suffixIcon={<IoSearchOutline />}
      onSelect={(e) => {}}
    >
      {ingredientData?.meals?.map((ingredient: any) => {
        return (
          <Option value={ingredient?.strIngredient}>
            {" "}
            {ingredient?.strIngredient}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelecBox;
