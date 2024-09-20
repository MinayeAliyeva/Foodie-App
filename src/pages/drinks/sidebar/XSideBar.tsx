import { Layout } from "antd";
import "./sidebar.css";
import { Accordion } from "@chakra-ui/react";
import DrinkCatagorie from "./DrinkCatagorie";
import DrinkGlasses from "./DrinkGlasses";
export const XSideBar = ({ getCatagorieData }: any) => {
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
        <DrinkGlasses/>
      </Accordion>
    </Layout.Sider>
  );
};
