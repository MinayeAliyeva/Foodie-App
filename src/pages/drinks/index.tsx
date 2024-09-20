import { useEffect, useMemo, useState } from "react";
import { Layout, Row, Col } from "antd";
import NavBar from "./navbar/NavBar";
import TopicMenu from "./TopicMenu";
import { XSideBar } from "./sidebar/XSideBar";
import XCard from "../../shared/components/XCard";
import {
  CocktailsResponse,
  useLazyGetCoctailByCatagoryQuery,
  useGetCoctailsQuery,
  useLazyGetCoctailsQuery,
  useLazyGetCoctailByGlasesQuery,
  useLazyGetCoctailByIngredientsQuery,
} from "../../store/apis/coctailApi";
import DrinkCard from "./DrinkCard";
import { filteredResponseData } from "../helpers";

export const Drinks = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [getCoctails, { data: mainData }] = useLazyGetCoctailsQuery();
  const [getCoctailByGlasses, { data: glassesData }] =
    useLazyGetCoctailByGlasesQuery();
  const [getCoctailByCatagory] = useLazyGetCoctailByCatagoryQuery<any>();
  const [getIngredientCoctails] = useLazyGetCoctailByIngredientsQuery();
  const [coctailAll, setMealsAll] = useState<any>({
    catagories: [],
    glasses: [],
    ingredients: [],
  });

  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const {
    data: coctailData,
    error,
    isLoading,
  } = useGetCoctailsQuery<{
    data?: CocktailsResponse;
    error: string;
    isLoading: boolean;
  }>();
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
  const [state, setState] = useState<{
    category: string[];
    glasses: string[];
    ingredient: string[];
  }>({
    category: [],
    glasses: [],
    ingredient: [],
  });

  const getSearchData = ({
    value,
    isChecked,
    key,
  }: {
    value: string;
    isChecked?: boolean;
    key?: "s" | "g" | "i";
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
    }
    if (key === "g") {
      if (isChecked) {
        setState((prev) => ({ ...prev, glasses: [...prev.glasses, value] }));
      } else {
        const filteredGlasses = state.glasses.filter(
          (glass) => glass !== value
        );
        setState((prev) => ({ ...prev, glasses: filteredGlasses }));
      }
    } else if (key === "i") {
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
        const coctailCatagoryPromises = state.category.map((catagory: any) => {
          return getCoctailByCatagory(catagory, true);
        });

        const coctails = await Promise.all(coctailCatagoryPromises);

        const drinksCatagoryResponse = coctails.flatMap(
          (mealObj: any) => mealObj?.data?.drinks || []
        );
        setMealsAll((prev: any) => ({
          ...prev,
          catagories: drinksCatagoryResponse,
        }));
      } catch (error) {
        console.log("error");
      }
    };
    const fetchGlassesData = async () => {
      try {
        const coctailGlasssesPromises = state?.glasses.map((glass: any) => {
          return getCoctailByGlasses(glass, true);
        });

        const coctails = await Promise.all(coctailGlasssesPromises);

        const drinksGlassesResponse = coctails.flatMap(
          (mealObj: any) => mealObj?.data?.drinks || []
        );
        setMealsAll((prev: any) => ({
          ...prev,
          glasses: drinksGlassesResponse,
        }));
      } catch (error) {
        console.log("error");
      }
    };
    const fetchIngredientData = async () => {
      try {
        const ingredientPromises = state.ingredient.map((ingredient: any) =>
          getIngredientCoctails(ingredient, true)
        );
        const ingredients = await Promise.all(ingredientPromises);
        const coctailsIngredientResponse = ingredients.flatMap(
          (mealObj) => mealObj?.data?.drinks || []
        );
        setMealsAll((prev: any) => ({
          ...prev,
          ingredients: coctailsIngredientResponse,
        }));
      } catch (error) {
        console.log("error");
      }
    };
    fetchIngredientData();
    fetchCatagoryData();
    fetchGlassesData();
    if (!state.category?.length) {
      getCoctails();
      setMealsAll({
        catagories: [],
      });
    }
  }, [
    state,
    getCoctails,
    getCoctailByCatagory,
    getCoctailByGlasses,
    getIngredientCoctails,
  ]);

  const drinks = useMemo(() => {
    const categoryIds =
      coctailAll?.catagories?.map((drink: any) => drink.idDrink) || [];
    const glassesIds =
      coctailAll?.glasses?.map((drink: any) => drink.idDrink) || [];
    const ingredientIds =
      coctailAll?.ingredients?.map((drink: any) => drink.idDrink) || [];
    if (
      state.category.length &&
      state.glasses.length &&
      state.ingredient.length
    ) {
      const combinedIds = [...categoryIds, ...glassesIds, ...ingredientIds];
      return filteredResponseData(combinedIds, 3, coctailAll.catagories);
    } else if (
      state.category.length &&
      state.glasses.length &&
      !state.ingredient.length
    ) {
      const combinedIds = [...categoryIds, ...glassesIds];
      return filteredResponseData(combinedIds, 2, coctailAll.catagories);
    } else if (
      state.category.length &&
      !state.glasses.length &&
      state.ingredient.length
    ) {
      const combinedIds = [...categoryIds, ...ingredientIds];
      return filteredResponseData(combinedIds, 2, coctailAll.catagories);
    } else if (
      !state.category.length &&
      state.glasses.length &&
      state.ingredient.length
    ) {
      const combinedIds = [...glassesIds, ...ingredientIds];
      return filteredResponseData(combinedIds, 2, coctailAll.areas);
    } else if (
      !state.category.length &&
      state.glasses.length &&
      !state.ingredient.length
    ) {
      return coctailAll.areas;
    } else if (
      state.category.length &&
      !state.glasses.length &&
      !state.ingredient.length
    ) {
      return coctailAll.catagories;
    } else if (
      !state.category.length &&
      !state.glasses.length &&
      state.ingredient.length
    ) {
      // a
      return coctailAll.ingredients;
    }
    return mainData?.drinks || [];
  }, [coctailAll, mainData?.drinks, state]);

  return (
    <>
      <NavBar menu={Menu} />
      <Layout>
        <XSideBar
          getGlassesData={getSearchData}
          getCatagorieData={getSearchData}
          getIngredientData={getIngredientData}
          menu={Menu}
        />
        <Layout.Content className="content">
          <Row gutter={[16, 16]}>
            <DrinkCard drinks={drinks} />
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};
