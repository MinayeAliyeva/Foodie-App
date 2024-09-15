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
import {
  IMealCatagorie,
  IMealCatagories,
  useFetchMealsByCatagoriesQuery,
} from "../../../store/apis/mealsApi";
import { useEffect, useState } from "react";
import { minMealCatagorieLength } from "../data";

export const XSideBar = ({ menu }: any) => {
  const { data: catagorieData } = useFetchMealsByCatagoriesQuery<{
    data: IMealCatagories;
  }>();
  const [catagorieState, setCatagorieState] = useState<IMealCatagorie[]>([]);
  useEffect(() => {
    getCatagorie(catagorieData?.categories);
  }, [catagorieData]);
  const getCatagorie = (categories?: IMealCatagorie[], size: number = 5) => {
    const data = categories?.slice(0, size)!;
    setCatagorieState(data);
  };
  const checkingEquality =
    catagorieState?.length === catagorieData?.categories?.length;
  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={"lg"}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
      <Accordion defaultIndex={[0, 1]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Katagoriler
              </Box>

              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Input placeholder="Axtar" />
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {catagorieState?.map((catagorie: any) => (
                <Box>
                  <Checkbox
                    key={catagorie?.idCategory}
                    value={catagorie?.strCategory}
                  >
                    {catagorie?.strCategory}
                  </Checkbox>
                </Box>
              ))}
            </Box>
            <Button
              onClick={() =>
                getCatagorie(
                  catagorieData?.categories,
                  checkingEquality ? minMealCatagorieLength : catagorieData?.categories?.length
                )
              }
            >
              {catagorieState?.length === catagorieData?.categories?.length
                ? "Gizle"
                : " Hamisini gosder"}
            </Button>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Layout.Sider>
  );
};
