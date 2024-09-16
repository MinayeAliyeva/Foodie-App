import { useEffect, useState } from "react";
import { Layout, Row } from "antd";
import NavBar from "./navbar/NavBar";
import TopicMenu from "./TopicMenu";
import { XSideBar } from "./sidebar/XSideBar";
import { MealsResponse, useLazyGetMealsQuery } from "../../store/apis/mealsApi";
import XCard from "../../shared/components/XCard";

export const Meals = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const [mealsAll, setMealsAll] = useState<any[]>([]);

  const [getMeals, { data, error, isLoading }] = useLazyGetMealsQuery<{
    data: MealsResponse;
    error: string;
    isLoading: boolean;
  }>();

  useEffect(() => {
    getMeals();
  }, [getMeals]);

  const meals = data?.meals;

  const Menu = <TopicMenu topics={topics} selectedKey={selectedKey} />;

  const getCatagorieData = async (categories: string[]) => {
    try {
      if (categories.length === 0) {
        await getMeals();
        setMealsAll([]);
      } else {
        const mealPromises = categories.map((category) => getMeals(category));
        const meals = await Promise.all(mealPromises);
        setMealsAll(meals);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  return (
    <>
      <NavBar menu={Menu} />
      <Layout>
        <XSideBar getCatagorieData={getCatagorieData} />
        <Layout.Content className="content">
          <Row gutter={[16, 16]}>
            {mealsAll.length > 0
              ? mealsAll.map((mealResponse: any) =>
                  mealResponse?.data?.meals?.map((meal: any) => (
                    <XCard key={meal.idMeal} meal={meal} />
                  ))
                )
              : meals?.map((meal: any) => (
                  <XCard key={meal.idMeal} meal={meal} />
                ))}
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};
