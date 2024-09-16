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

export const XSideBar = ({ getCatagorieData,getAreaData }: any) => {
  const [areaState, setAreaState] = useState([]);
  const { data: areaData } = useGetMealsAreaQuery();
  // const getArea = (areas:any, size: number = 5) => {
  //   if (!areas) return;
  //   const data = categories?.slice(0, size);
  //   setCatagorieState(data);
  // };
  const handleChangeAreaCheckbox = (event: any) => {
    const areaValue = event.target.value;
    getAreaData(areaValue)
  };
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
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Ərazi
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Input placeholder="Axtar" />
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {areaData?.meals?.map((area: any) => (
                <Box>
                  <Checkbox
                    value={area?.strArea}
                    onChange={handleChangeAreaCheckbox}
                  >
                    {area?.strArea}
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
              // onClick={()=>getArea(
              //   areaData?.meals,
              // )}
            >
              Hamısını göstər
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Layout.Sider>
  );
};
