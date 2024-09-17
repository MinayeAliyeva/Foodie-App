import { Button, Checkbox, Input, Layout } from "antd";
import "./sidebar.css";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import Catagorie from "./Catagorie";
import { useState } from "react";
import { useGetMealsAreaQuery } from "../../../store/apis/mealsApi";
import MealArea from "./Area";
import MealIngredients from "./MealIngredients";

export const XSideBar = ({ getCatagorieData, getAreaData }: any) => {
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
        <MealIngredients  />
      </Accordion>
    </Layout.Sider>
  );
};
