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
import XCard from "../../shared/components/XCard";

export const Meals = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [selectedKey, setSelectedKey] = useState("0");
  const [mealsAll, setMealsAll] = useState<any>({
    catagories: [],
    areas: [],
  });

  console.log("mealsAll", mealsAll);

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
    console.log({ value, isChecked, key });
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

    // switch (key) {
    //   case "s":
    //     setState((prev) => ({ ...prev, category: [...prev.category, value] }));
    //     break;
    //   case "a":
    //     setState((prev) => ({ ...prev, area: [...prev.area, value] }));
    //     break;
    //   case "i":
    //     setState((prev) => ({
    //       ...prev,
    //       ingredient: [...prev.ingredient, value],
    //     }));
    //     break;
    // }
  };
  console.log("mealsAll.cat", mealsAll?.catagories);
  console.log("mealsAll.areas", mealsAll.areas);

  const mealList = useMemo(() => {
    // const combinedMeals = [
    //   ...(mealsAll?.catagories || []),
    //   ...(mealsAll.areas || []),
    // ];
    // const combinedMeals =   mealsAll.catagories?.length && mealsAll.areas?.length
    //     ? mealsAll.catagories?.map((catagorie: any) => {
    //         mealsAll.areas?.filter(
    //           (area: any) => area?.idMeal === catagorie?.idMeal
    //         );
    //       })
    //     : [...(mealsAll?.catagories || []), ...(mealsAll.areas || [])];
    // console.log("combinedMeals", combinedMeals);
    // return combinedMeals;
    const sameIdMeals = mealsAll?.catagories?.filter((thumbnail: any) =>
      mealsAll?.areas?.some((meal: any) => meal.idMeal === thumbnail.idMeal)
    );
    return sameIdMeals;
  }, [mealsAll]);
  console.log("sameIdMeals", mealList);

  const meals = mealList?.length > 0 ? mealList : data?.meals || [];

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
          catagories: mealsCatagoryResponse, // Eğer prev.categories undefined ise, boş bir diziyle başlatılır
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
          areas: mealsAreaResponse, // Eğer prev.categories undefined ise, boş bir diziyle başlatılır
        }));
        showAllFilteredMeal.areas = mealsAreaResponse;
      } catch (error) {
        console.log("error");
      }
    };
    const combinedMeals = [
      ...showAllFilteredMeal.catagories,
      ...showAllFilteredMeal.areas,
    ];
    console.log("combinedMeals", combinedMeals);

    if (state?.area?.length) {
      fetcAreaData();
    }
    if (state.category?.length) {
      fetchCatagoryData();
    }
    if (!state.category?.length && !state.area?.length) {
      getMeals();
      setMealsAll([]);
    }
  }, [state]);

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
          <Row gutter={[16, 16]}>
            {meals?.map((meal: any) => (
              <XCard key={meal?.idMeal} meal={meal} />
            ))}
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};
