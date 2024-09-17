import { useEffect, useState } from "react";
import { Layout, Row } from "antd";
import NavBar from "./navbar/NavBar";
import TopicMenu from "./TopicMenu";
import { XSideBar } from "./sidebar/XSideBar";
import {
  useLazyGetMealsByAreaQuery,
  useLazyGetMealsByIngredientsQuery,
  useLazyGetMealsQuery,
} from "../../store/apis/mealsApi";
import XCard from "../../shared/components/XCard";

export const Meals = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [selectedKey, setSelectedKey] = useState("0");
  const [mealsAll, setMealsAll] = useState<any[]>([]);

  const [state, setState] = useState<{
    category: string[];
    area: string[];
    ingredient: string[];
  }>({
    category: [],
    area: [],
    ingredient: [],
  });

  const [getMeals, { data }] = useLazyGetMealsQuery();
  const [getmealsIngredient, { data: ingredientData }] =
    useLazyGetMealsByIngredientsQuery<any>();

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
        const mealPromises = categories.map((category) =>
          getMeals(category, true)
        );
        const meals = await Promise.all(mealPromises);
        const mealsData = meals.flatMap(
          (response) => response?.data?.meals || []
        );
        setMealsAll((prev) => [...prev, ...mealsData]);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const [getAreaMeals] = useLazyGetMealsByAreaQuery();

  const getAreaData = async (areas: string[]) => {
    try {
      if (areas.length === 0) {
        await getMeals();
        setMealsAll([]);
      } else {
        const mealPromises = areas.map((area: any) => getAreaMeals(area, true));
        const meals = await Promise.all(mealPromises);
        console.log("56meals", meals);
        const mealsData = meals.flatMap(
          (response) => response?.data?.meals || []
        );
        setMealsAll((prev) => [...prev, ...mealsData]);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  const getIngredientData = async (ingredients: string[]) => {
    try {
      if (ingredients.length === 0) {
        await getMeals();
        setMealsAll([]);
      } else {
        const mealPromises = ingredients?.map((ingredient: string) =>
          getmealsIngredient(ingredient, true)
        );
        const meals = await Promise.all(mealPromises);
        const mealsData = meals.flatMap(
          (response) => response?.data?.meals || []
        );
        setMealsAll((prev) => [...prev, ...mealsData]);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const getSearchData = ({
    value,
    isChecked,
    key,
  }: {
    value: string;
    isChecked?: boolean;
    key?: string;
  }) => {
    console.log({ value, isChecked, key });
    if (state.category.find((val) => val !== value && isChecked)) {
      // setState({...state.c});
    }
    // const category = [state.category.filter]
    switch (key) {
      case "s":
        setState((prev) => ({ ...prev, category: [...prev.category, value] }));
        break;
      case "a":
        setState((prev) => ({ ...prev, area: [...prev.area, value] }));
        break;
      case "i":
        setState((prev) => ({
          ...prev,
          ingredient: [...prev.ingredient, value],
        }));
        break;
    }
  };

  return (
    <>
      <NavBar menu={Menu} />
      <Layout>
        <XSideBar
          getAreaData={getAreaData}
          getCatagorieData={getSearchData}
          getIngredientData={getIngredientData}
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
