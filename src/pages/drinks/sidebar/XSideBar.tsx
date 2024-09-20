import { Layout } from "antd";
import "./sidebar.css";
import { Accordion } from "@chakra-ui/react";
import DrinkCatagorie from "./DrinkCatagorie";
import DrinkGlasses from "./DrinkGlasses";
import DrinkIngredient from "./DrinkIngredient";
export const XSideBar = ({
  getCatagorieData,
  getGlassesData,
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
        <DrinkCatagorie getCatagorieData={getCatagorieData} />
        <DrinkGlasses getGlassesData={getGlassesData} />
        <DrinkIngredient getIngredientData={getIngredientData} />
      </Accordion>
    </Layout.Sider>
  );
};
