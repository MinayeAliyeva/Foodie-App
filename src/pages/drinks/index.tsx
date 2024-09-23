import { useCallback, useEffect, useMemo, useState } from "react";
import { Layout, Row, Empty } from "antd";
import NavBar from "./navbar/NavBar";
import TopicMenu from "./TopicMenu";
import { XSideBar } from "./sidebar/XSideBar";
import {
  useLazyGetCoctailByCatagoryQuery,
  useLazyGetCoctailsQuery,
  useLazyGetCoctailByGlasesQuery,
  useLazyGetCoctailByIngredientsQuery,
} from "../../store/apis/coctailApi";
import {
  fetchData,
  filteredResponseData,
  transformCardData,
  uniqueIds,
} from "../helpers";
import CustomCard from "../../shared/components/CustomCard";
import ImgCardSkeloton from "../../shared/components/skeleton/ImgCardSkeloton";
import { IMeal } from "../../modules";

export const Drinks = () => {
  const [getCoctails, { data: mainData, isFetching: isFetchingCocktails }] =
    useLazyGetCoctailsQuery();
  const [getCoctailByGlasses, { isFetching: isFetchingGlasses }] =
    useLazyGetCoctailByGlasesQuery();
  const [getCoctailByCatagory] = useLazyGetCoctailByCatagoryQuery<{
    meals: Array<IMeal>;
  }>();
  const [getIngredientCoctails, { isFetching: isFetchingIngredients }] =
    useLazyGetCoctailByIngredientsQuery();

  const isCocktailDataLoading =
    isFetchingCocktails || isFetchingGlasses || isFetchingIngredients;
  const storedFavorites = localStorage.getItem("likes");
  const [coctailAll, setCocktailsAll] = useState<any>({
    catagories: [],
    glasses: [],
    ingredients: [],
  });

  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event: any) => {
    const key = event.key;
    setSelectedKey(key);
  };
  const Menu = (
    <TopicMenu
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

  const getSearchData = useCallback(
    ({
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
    },
    [state.category, state.ingredient, state.glasses]
  );
  const getIngredientData = (values: string[]) => {
    setState((prev) => ({ ...prev, ingredient: values }));
  };

  useEffect(() => {
    (
      fetchData({
        data: state?.category,
        trigger: getCoctailByCatagory,
        key: "drinks",
      }) as Promise<any>
    ).then((res: any) => {
      const transformedData = transformCardData(res, "drink", storedFavorites);
      setCocktailsAll((prev: any) => ({
        ...prev,
        catagories: transformedData,
      }));
    });

    (
      fetchData({
        data: state?.glasses,
        trigger: getCoctailByGlasses,
        key: "drinks",
      }) as Promise<any>
    ).then((res: any) => {
      const transformedData = transformCardData(res, "drink", storedFavorites);
      setCocktailsAll((prev: any) => ({
        ...prev,
        glasses: transformedData,
      }));
    });

    (
      fetchData({
        data: state?.ingredient,
        trigger: getIngredientCoctails,
        key: "drinks",
      }) as Promise<any>
    ).then((res: any) => {
      const transformedData = transformCardData(res, "drink", storedFavorites);
      setCocktailsAll((prev: any) => ({
        ...prev,
        ingredients: transformedData,
      }));
    });

    if (
      !state.category?.length &&
      !state.glasses?.length &&
      !state.ingredient?.length
    ) {
      getCoctails();
      setCocktailsAll({
        catagories: [],
        glasses: [],
        ingredients: [],
      });
    }
  }, [
    state,
    getCoctails,
    getCoctailByCatagory,
    getCoctailByGlasses,
    getIngredientCoctails,
    storedFavorites,
  ]);

  const drinks = useMemo(() => {
    const categoryIds =
      coctailAll?.catagories?.map((drink: any) => drink.id) || [];
    const glassesIds = coctailAll?.glasses?.map((drink: any) => drink.id) || [];
    const ingredientIds =
      coctailAll?.ingredients?.map((drink: any) => drink.id) || [];
    const uniqueIngredientsIds: string[] = uniqueIds(ingredientIds);
    const uniqueCotogorieIds: string[] = uniqueIds(categoryIds);
    const uniqueGlassesIds: string[] = uniqueIds(glassesIds);
    const commonIds = uniqueCotogorieIds.filter((id) =>
      uniqueGlassesIds.includes(id)
    );
    console.log("commonIds", commonIds.length);

    if (
      state.category.length &&
      state.glasses.length &&
      state.ingredient.length
    ) {
      const combinedIds = [
        ...uniqueIngredientsIds,
        ...uniqueCotogorieIds,
        ...uniqueGlassesIds,
      ];
      return filteredResponseData(combinedIds, 3, coctailAll.catagories);
    } else if (
      state.category.length &&
      state.glasses.length &&
      !state.ingredient.length
    ) {
      const combinedIds = [...uniqueCotogorieIds, ...uniqueGlassesIds];
      return filteredResponseData(combinedIds, 2, coctailAll.catagories);
    } else if (
      state.category.length &&
      !state.glasses.length &&
      state.ingredient.length
    ) {
      const combinedIds: string[] = [
        ...uniqueIngredientsIds,
        ...uniqueCotogorieIds,
      ];
      return filteredResponseData(combinedIds, 2, coctailAll.catagories);
    } else if (
      !state.category.length &&
      state.glasses.length &&
      state.ingredient.length
    ) {
      const combinedIds = [...uniqueGlassesIds, ...uniqueIngredientsIds];
      return filteredResponseData(combinedIds, 2, coctailAll.glasses);
    } else if (
      !state.category.length &&
      state.glasses.length &&
      !state.ingredient.length
    ) {
      return coctailAll.glasses;
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
      return coctailAll.ingredients;
    }

    return transformCardData(mainData?.drinks!, "drink", storedFavorites) || [];
  }, [coctailAll, mainData?.drinks, state, storedFavorites]);

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
          <Row
            style={{ fontSize: "25px", color: "#C62828", fontWeight: "bold" }}
          >
            {" "}
            VERI SAYI: {drinks?.length}
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            gutter={[16, 16]}
          >
            {isCocktailDataLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <ImgCardSkeloton key={index} />
              ))
            ) : drinks?.length ? (
              <CustomCard dataList={drinks} />
            ) : (
              <Empty
                description="No Drinks found"
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
