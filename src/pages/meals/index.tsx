import { useEffect, useState } from "react";
import { Layout, Row } from "antd";
import NavBar from "./navbar/NavBar";
import TopicMenu from "./TopicMenu";
import { XSideBar } from "./sidebar/XSideBar";
import {
  MealsResponse,
  useLazyGetMealsByAreaQuery,
  useLazyGetMealsQuery,
} from "../../store/apis/mealsApi";
import XCard from "../../shared/components/XCard";

export const Meals = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [selectedKey, setSelectedKey] = useState("0");
  const [mealsAll, setMealsAll] = useState<any[]>([]);

  const [getMeals, { data, error, isLoading }] = useLazyGetMealsQuery();

  useEffect(() => {
    getMeals();
  }, [getMeals]);

  const meals = mealsAll.length > 0 ? mealsAll : data?.meals || [];

  const Menu = <TopicMenu topics={topics} selectedKey={selectedKey} />;

  const getCatagorieData = async (categories: string[]) => {
    try {
      if (categories.length === 0) {
        await getMeals();
        setMealsAll([]);
      } else {
        const mealPromises = categories.map((category) => getMeals(category));
        const meals = await Promise.all(mealPromises);
        setMealsAll(meals.flatMap((response) => response?.data?.meals || []));
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const [getAreaMeals] = useLazyGetMealsByAreaQuery();

  const getAreaData = async (area: string) => {
    try {
      const result = await getAreaMeals(area).unwrap(); // unwrap() ile veriyi direkt alabiliriz
      setMealsAll(result.meals); // Burada result.meaals yerine result.meals olmalıydı
    } catch (error) {
      console.error("Error fetching meals by area:", error);
    }
  };

  return (
    <>
      <NavBar menu={Menu} />
      <Layout>
        <XSideBar
          getAreaData={getAreaData}
          getCatagorieData={getCatagorieData}
        />
        <Layout.Content className="content">
          <Row gutter={[16, 16]}>
            {meals.map((meal: any) => (
              <XCard key={meal.idMeal} meal={meal} />
            ))}
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};
