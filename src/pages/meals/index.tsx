import { useCallback, useEffect, useMemo, useState } from "react";
import { Empty, Layout, Row } from "antd";
import NavBar from "./navbar/NavBar";
import TopicMenu from "./TopicMenu";
import { XSideBar } from "./sidebar/XSideBar";
import {
  useLazyGetMealsByAreaQuery,
  useLazyGetMealsByIngredientsQuery,
  useLazyGetMealsQuery,
} from "../../store/apis/mealsApi";
import {
  fetchData,
  filteredResponseData,
  transformCardData,
  uniqueIds,
} from "../helpers";
import ImgCardSkeloton from "../../shared/components/skeleton/ImgCardSkeloton";
import CustomCard from "../../shared/components/CustomCard";

export const Meals = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [selectedKey, setSelectedKey] = useState("0");
  const [mealsAll, setMealsAll] = useState<any>({
    catagories: [],
    areas: [],
    ingredients: [],
  });
  const storedFavorites = localStorage.getItem("likes");
  const [state, setState] = useState<{
    category: string[];
    area: string[];
    ingredient: string[];
  }>({
    category: [],
    area: [],
    ingredient: [],
  });

  const [getMeals, { data, isFetching: isFetchingMeals }] =
    useLazyGetMealsQuery();

  useEffect(() => {
    getMeals();
  }, [getMeals]);

  const Menu = <TopicMenu topics={topics} selectedKey={selectedKey} />;

  const [getAreaMeals, { isFetching: isFetchingArea }] =
    useLazyGetMealsByAreaQuery();
  const [getIngredientMeals, { isFetching: isFetchingIngredient }] =
    useLazyGetMealsByIngredientsQuery();

  const isMealDataLoading =
    isFetchingMeals || isFetchingArea || isFetchingIngredient;

  const getSearchData = useCallback(
    ({
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
          setState((prev) => ({
            ...prev,
            category: [...prev.category, value],
          }));
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
    },
    [state.area, state?.category]
  );
  const getIngredientData = (values: string[]) => {
    setState((prev) => ({ ...prev, ingredient: values }));
  };

  useEffect(() => {
    (
      fetchData({
        data: state?.category,
        trigger: getMeals,
        key: "meals",
      }) as Promise<any>
    ).then((res: any) => {
      const transformedData = transformCardData(res, "meal", storedFavorites);
      setMealsAll((prev: any) => ({
        ...prev,
        catagories: transformedData,
      }));
    });

    (
      fetchData({
        data: state?.area,
        trigger: getAreaMeals,
        key: "meals",
      }) as Promise<any>
    ).then((res: any) => {
      const transformedData = transformCardData(res, "meal", storedFavorites);
      setMealsAll((prev: any) => ({
        ...prev,
        areas: transformedData,
      }));
    });
    (
      fetchData({
        data: state?.ingredient,
        trigger: getIngredientMeals,
        key: "meals",
      }) as Promise<any>
    ).then((res: any) => {
      const transformedData = transformCardData(res, "meal", storedFavorites);
      setMealsAll((prev: any) => ({
        ...prev,
        ingredients: transformedData,
      }));
    });

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
  }, [state, getAreaMeals, getMeals, getIngredientMeals,storedFavorites]);

  const mealList = useMemo(() => {
    const categoryIds = mealsAll?.catagories.map((meal: any) => meal.id);
    const areaIds = mealsAll?.areas.map((meal: any) => meal.id);
    const ingredientIds = mealsAll?.ingredients.map((meal: any) => meal.id);
    const uniqueCotogorieIds: string[] = uniqueIds(categoryIds);
    const uniqueAreasIds: string[] = uniqueIds(areaIds);
    const uniqueIngredientsIds: string[] = uniqueIds(ingredientIds);

    if (state.category.length && state.area.length && state.ingredient.length) {
      const combinedIds = [
        ...uniqueCotogorieIds,
        ...uniqueAreasIds,
        ...uniqueIngredientsIds,
      ];
      return filteredResponseData(combinedIds, 3, mealsAll.catagories);
    } else if (
      state.category.length &&
      state.area.length &&
      !state.ingredient.length
    ) {
      const combinedIds = [...uniqueCotogorieIds, ...uniqueAreasIds];

      return filteredResponseData(combinedIds, 2, mealsAll.catagories);
    } else if (
      state.category.length &&
      !state.area.length &&
      state.ingredient.length
    ) {
      const combinedIds = [...uniqueCotogorieIds, ...uniqueIngredientsIds];

      return filteredResponseData(combinedIds, 2, mealsAll.catagories);
    } else if (
      !state.category.length &&
      state.area.length &&
      state.ingredient.length
    ) {
      const combinedIds = [...uniqueAreasIds, ...uniqueIngredientsIds];
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
      return transformCardData(data?.meals!, "meal", storedFavorites);
    }
  }, [mealsAll, data?.meals, state,storedFavorites]);

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
            {isMealDataLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <ImgCardSkeloton key={index} />
              ))
            ) : mealList?.length ? (
              <CustomCard dataList={mealList} />
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
