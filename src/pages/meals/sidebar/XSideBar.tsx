import { Layout } from "antd";
import "./sidebar.css";
import { Accordion } from "@chakra-ui/react";
import Catagorie from "./Catagorie";
import MealArea from "./Area";
import MealIngredients from "./MealIngredients";

export const XSideBar = ({
  getCatagorieData,
  getAreaData,
  getIngredientData,
}: any) => {
  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={"lg"}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
      <Accordion defaultIndex={[0, 1]} allowMultiple>
        <Catagorie getCatagorieData={getCatagorieData} />
        <MealArea getAreaData={getAreaData} />
        <MealIngredients getIngredientData={getIngredientData} />
      </Accordion>
    </Layout.Sider>
  );
};
