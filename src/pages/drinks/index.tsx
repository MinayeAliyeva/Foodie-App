import { useState } from "react";
import { Layout, Row, Col } from "antd";
import NavBar from "./navbar/NavBar";
import TopicMenu from "./TopicMenu";
import { XSideBar } from "./sidebar/XSideBar";
import XCard from "../../shared/components/XCard";
import { CocktailsResponse, useGetCoctailsQuery } from "../../store/apis/coctailApi";

export const Drinks = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");

  //FETCHING MEALS
  const { data, error, isLoading } = useGetCoctailsQuery<{
    data: CocktailsResponse;
    error: string;
    isLoading: boolean;
  }>();
  console.log("cocktail", data);
  const drinks = data?.drinks;
  const changeSelectedKey = (event: any) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };
  const Menu = (
    <TopicMenu
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

  return (
    <>
      <NavBar menu={Menu} />
      <Layout>
        <XSideBar menu={Menu} />
        <Layout.Content className="content">
          <Row gutter={[16, 16]}>
            {drinks?.map((drink:any) => (
              <Col span={6} key={drink?.idDrink}>
                {/* <XCard data={} /> */}
              </Col>
            ))}
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};
