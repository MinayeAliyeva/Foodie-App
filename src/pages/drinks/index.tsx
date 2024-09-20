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
} from "../../store/apis/coctailApi";
import DrinkCard from "./DrinkCard";
import { filteredResponseData } from "../helpers";

export const Drinks = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [getCoctails, { data: mainData }] = useLazyGetCoctailsQuery();
  const [getCoctailByGlasses, { data: glassesData }] =
    useLazyGetCoctailByGlasesQuery();
  const [getCoctailByCatagory] = useLazyGetCoctailByCatagoryQuery<any>();
  const [mealsAll, setMealsAll] = useState<any>({
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
    }
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
    fetchCatagoryData();
    fetchGlassesData();
    if (!state.category?.length) {
      getCoctails();
      setMealsAll({
        catagories: [],
      });
    }
  }, [state, getCoctails, getCoctailByCatagory, getCoctailByGlasses]);

  const drinks = useMemo(() => {
    const categoryIds =
      mealsAll?.catagories?.map((drink: any) => drink.idDrink) || [];
    const glassesIds =
      mealsAll?.glasses?.map((drink: any) => drink.idDrink) || [];
    const ingredientIds =
      mealsAll?.ingredients?.map((drink: any) => drink.idDrink) || [];
    if (
      state.category.length &&
      state.glasses.length &&
      !state.ingredient.length
    ) {
      console.log("GID");
      const combinedIds = [...categoryIds, ...glassesIds];
      return filteredResponseData(combinedIds, 2, mealsAll.catagories);
    }
    if (state.category.length) {
      return mealsAll.catagories;
    }
    if (state.glasses.length) {
      return mealsAll.glasses;
    }
    return mainData?.drinks || [];
  }, [mealsAll, mainData?.drinks, state]);

  return (
    <>
      <NavBar menu={Menu} />
      <Layout>
        <XSideBar
          getGlassesData={getSearchData}
          getCatagorieData={getSearchData}
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
