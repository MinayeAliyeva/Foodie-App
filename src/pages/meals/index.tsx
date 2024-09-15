import { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import NavBar from "./navbar/NavBar";
import TopicMenu from "./TopicMenu";
import { XSideBar } from "./sidebar/XSideBar";
import { MealsResponse, useLazyGetMealsQuery } from "../../store/apis/mealsApi";
import XCard from "../../shared/components/XCard";

export const Meals = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");

  //FETCHING MEALS
  const [getMeals, { data, error, isLoading }] = useLazyGetMealsQuery<{
    data: MealsResponse;
    error: string;
    isLoading: boolean;
  }>();
  useEffect(() => {
    getMeals();
  }, []);
  console.log("data", data);
  const meals = data?.meals;
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
  const getCatagorieData = (catagorie: string) => {
    getMeals( catagorie );
  };
  return (
    <>
      <NavBar menu={Menu} />
      <Layout>
        <XSideBar getCatagorieData={getCatagorieData} />
        <Layout.Content className="content">
          <Row gutter={[16, 16]}>
            {meals?.map((meal) => (
              <Col span={6} key={meal.idMeal}>
                <XCard meal={meal} />
              </Col>
            ))}
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};
