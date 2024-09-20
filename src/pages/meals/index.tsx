import { useEffect, useMemo, useState } from "react";
import { Empty, Layout, Row } from "antd";
import NavBar from "./navbar/NavBar";
import TopicMenu from "./TopicMenu";
import { XSideBar } from "./sidebar/XSideBar";
import {
  useLazyGetMealsByAreaQuery,
  useLazyGetMealsByIngredientsQuery,
  useLazyGetMealsQuery,
} from "../../store/apis/mealsApi";
import MealCard from "./MealCard";
import { filteredResponseData } from "../helpers";

export const Meals = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [selectedKey, setSelectedKey] = useState("0");
  const [mealsAll, setMealsAll] = useState<any>({
    catagories: [],
    areas: [],
    ingredients: [],
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
  const [getIngredientMeals] = useLazyGetMealsByIngredientsQuery();

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
        setState((prev) => ({ ...prev, area: filteredArea }));
      }
    }
     else if (key === "i") {
      console.log("ING", { value, isChecked, key });
      if (isChecked) {
        setState((prev) => ({
          ...prev,
          ingredient: [...prev.ingredient, value],
        }));
      } else {
        const filteredIngredient = state.ingredient.filter(
          (ingredient) => ingredient !== value
        );
        setState((prev) => ({ ...prev, ingredient: filteredIngredient }));
      }
    }
  };
  const getIngredientData = (values: string[]) => {
    setState((prev) => ({ ...prev, ingredient: values }));
  };
  useEffect(() => {
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
      } catch (error) {
        console.log("error");
      }
    };

    const fetchAreaData = async () => {
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
      } catch (error) {
        console.log("error");
      }
    };

    const fetchIngredientData = async () => {
      try {
        const ingredientPromises = state.ingredient.map((ingredient: string) =>
          getIngredientMeals(ingredient, true)
        );
        const ingredients = await Promise.all(ingredientPromises);
        const mealsIngredientResponse = ingredients.flatMap(
          (mealObj) => mealObj?.data?.meals || []
        );
        setMealsAll((prev: any) => ({
          ...prev,
          ingredients: mealsIngredientResponse,
        }));
      } catch (error) {
        console.log("error");
      }
    };

    fetchCatagoryData();
    fetchAreaData();
    fetchIngredientData();

    if (
      !state.category?.length &&
      !state.area?.length &&
      !state.ingredient?.length
    ) {
      getMeals();
      setMealsAll({
        catagories: [],
        areas: [],
        ingredients: [],
      });
    }
  }, [state, getAreaMeals, getMeals, getIngredientMeals]);


  const mealList = useMemo(() => {
    const categoryIds = mealsAll?.catagories.map((meal: any) => meal.idMeal); //catagorilerin idleri mapde
    const areaIds = mealsAll?.areas.map((meal: any) => meal.idMeal); //area idleri mapde
    const ingredientIds = mealsAll?.ingredients.map((meal: any) => meal.idMeal); //ingredient id mapde
    if (state.category.length && state.area.length && state.ingredient.length) {
      const combinedIds = [...categoryIds, ...areaIds, ...ingredientIds];
      return filteredResponseData(combinedIds, 3, mealsAll.catagories);
    } else if (
      state.category.length &&
      state.area.length &&
      !state.ingredient.length
    ) {
      const combinedIds = [...categoryIds, ...areaIds];
      return filteredResponseData(combinedIds, 2, mealsAll.catagories);
    } else if (
      state.category.length &&
      !state.area.length &&
      state.ingredient.length
    ) {
      const combinedIds = [...categoryIds, ...ingredientIds];
      return filteredResponseData(combinedIds, 2, mealsAll.catagories);
    } else if (
      !state.category.length &&
      state.area.length &&
      state.ingredient.length
    ) {
      const combinedIds = [...areaIds, ...ingredientIds];
      return filteredResponseData(combinedIds, 2, mealsAll.areas);
    } else if (
      !state.category.length &&
      state.area.length &&
      !state.ingredient.length
    ) {
      return mealsAll.areas;
    } else if (
      state.category.length &&
      !state.area.length &&
      !state.ingredient.length
    ) {
      return mealsAll.catagories;
    } else if (
      !state.category.length &&
      !state.area.length &&
      state.ingredient.length
    ) {
      // a
      return mealsAll.ingredients;
    } else {
      return data?.meals;
    }
  }, [mealsAll, data?.meals, state]);

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
            VERI SAYI: {mealList?.length}
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            gutter={[16, 16]}
          >
            {mealList?.length ? (
              <MealCard meals={mealList} />
            ) : (
              <Empty
                description="No meals found"
                style={{
                  fontSize: "24px",
                  color: "#C62828",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            )}
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};
