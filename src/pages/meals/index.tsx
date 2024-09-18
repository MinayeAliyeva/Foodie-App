import { useEffect, useMemo, useState } from "react";
import { Layout, Row } from "antd";
import NavBar from "./navbar/NavBar";
import TopicMenu from "./TopicMenu";
import { XSideBar } from "./sidebar/XSideBar";
import {
  useLazyGetMealsByAreaQuery,
  useLazyGetMealsByIngredientsQuery,
  useLazyGetMealsQuery,
} from "../../store/apis/mealsApi";
import XCard, { IDrink, IMeal } from "../../shared/components/XCard";
import { useNavigate } from "react-router";
import { ICardData2 } from "../../modules";
import MealCard from "./MealCard";

export const Meals = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [selectedKey, setSelectedKey] = useState("0");
  const [mealsAll, setMealsAll] = useState<any>({
    catagories: [],
    areas: [],
  });

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

  const Menu = <TopicMenu topics={topics} selectedKey={selectedKey} />;

  const [getAreaMeals] = useLazyGetMealsByAreaQuery();

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
        setMealsAll((prev: any) => [...prev, ...mealsData]);
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
    key?: "s" | "a" | "i";
  }) => {
    if (key === "s") {
      if (isChecked) {
        setState((prev) => ({ ...prev, category: [...prev.category, value] }));
      } else {
        const filteredCatagory = state.category.filter(
          (catagory) => catagory !== value
        );
        setState((prev) => ({ ...prev, category: filteredCatagory }));
      }
    } else if (key === "a") {
      if (isChecked) {
        setState((prev) => ({ ...prev, area: [...prev.area, value] }));
      } else {
        const filteredArea = state.area.filter((area) => area !== value);
        console.log("filteredArea", filteredArea);
        setState((prev) => ({ ...prev, area: filteredArea }));
      }
    } else if (key === "i") {
      if (isChecked) {
        setState((prev) => ({
          ...prev,
          ingredient: [...prev.ingredient, value],
        }));
      } else {
        const filteredIngredient = state.area.filter(
          (ingredient) => ingredient !== value
        );
        setState((prev) => ({ ...prev, ingredient: filteredIngredient }));
      }
    }
  };
  useEffect(() => {
    let showAllFilteredMeal = { catagories: [], areas: [] } as any;
    const fetchCatagoryData = async () => {
      try {
        const mealPromises = state.category.map((catagory: string) =>
          getMeals(catagory, true)
        );
        const meals = await Promise.all(mealPromises);
        const mealsCatagoryResponse = meals.flatMap(
          (mealObj) => mealObj?.data?.meals || []
        );
        setMealsAll((prev: any) => ({
          ...prev,
          catagories: mealsCatagoryResponse,
        }));
        showAllFilteredMeal.catagories = mealsCatagoryResponse;
      } catch (error) {
        console.log("error");
      }
    };

    const fetcAreaData = async () => {
      try {
        const areaPromises = state.area.map((area: string) =>
          getAreaMeals(area, true)
        );

        const areas = await Promise.all(areaPromises);

        const mealsAreaResponse = areas.flatMap(
          (mealObj) => mealObj?.data?.meals || []
        );

        setMealsAll((prev: any) => ({
          ...prev,
          areas: mealsAreaResponse,
        }));
        showAllFilteredMeal.areas = mealsAreaResponse;
        console.log("mealsAreaResponse", mealsAreaResponse);
      } catch (error) {
        console.log("error");
      }
    };
    console.log("LENGTH AREA ", state?.area?.length);
    fetcAreaData();
    fetchCatagoryData();

    if (!state.category?.length && !state.area?.length) {
      getMeals();
      setMealsAll([]);
    }
  }, [state, getAreaMeals, getMeals]);

  const mealList = useMemo(() => {
    const sameIdMeals = mealsAll?.catagories?.filter((thumbnail: any) =>
      mealsAll?.areas?.some((meal: any) => meal.idMeal === thumbnail.idMeal)
    );
    return sameIdMeals;
  }, [mealsAll]);

  const meals = useMemo(() => {
    console.log("mealsArea", mealsAll?.areas);
    const catagorieId = mealsAll?.catagories.map((meal: any) => meal.idMeal);
    console.log("catagorieId", catagorieId);
    const areasId = mealsAll?.areas.map((area: any) => area.idMeal);
    console.log("areasId", areasId);
    const commonNumbers = catagorieId.filter((number: any) =>
      areasId.includes(number)
    );
    console.log("mealsAll?.catagories", mealsAll?.catagories);
    console.log("mealList", mealList);
    console.log("commonNumbers", commonNumbers);

    if (mealsAll?.catagories?.length && !mealsAll?.areas?.length) {
      return mealsAll.catagories;
    } else if (!mealsAll?.catagories?.length && mealsAll?.areas?.length) {
      return mealsAll.areas;
    } else if (mealsAll?.catagories?.length && mealsAll?.areas?.length) {
      return mealList;
    } else {
      return data?.meals;
    }
  }, [mealsAll.catagories, mealList, data?.meals, mealsAll.areas]);







  return (
    <>
      <NavBar menu={Menu} />
      <Layout>
        <XSideBar
          getAreaData={getSearchData}
          getCatagorieData={getSearchData}
          getIngredientData={getIngredientData}
        />
        <Layout.Content className="content">
          <Row
            style={{ fontSize: "25px", color: "#C62828", fontWeight: "bold" }}
          >
            {" "}
            VERI SAYI: {meals?.length}
          </Row>
          <Row gutter={[16, 16]}>
            <MealCard meals={meals} />
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};
