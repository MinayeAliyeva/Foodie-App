import { useEffect, useMemo, useState } from "react";
import { Layout, Row, Col } from "antd";
import NavBar from "./navbar/NavBar";
import TopicMenu from "./TopicMenu";
import { XSideBar } from "./sidebar/XSideBar";
import {
  CocktailsResponse,
  useLazyGetCoctailByCatagoryQuery,
  useGetCoctailsQuery,
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

export const Drinks = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [getCoctails, { data: mainData }] = useLazyGetCoctailsQuery();
  const [getCoctailByGlasses] = useLazyGetCoctailByGlasesQuery();
  const [getCoctailByCatagory] = useLazyGetCoctailByCatagoryQuery<any>();
  const [getIngredientCoctails] = useLazyGetCoctailByIngredientsQuery();
  const storedFavorites = localStorage.getItem("likes");
  const [coctailAll, setCocktailsAll] = useState<any>({
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

    if (!state.category?.length) {
      getCoctails();
      setCocktailsAll({
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
      coctailAll?.catagories?.map((drink: any) => drink.id) || [];
    const glassesIds = coctailAll?.glasses?.map((drink: any) => drink.id) || [];
    const ingredientIds =
      coctailAll?.ingredients?.map((drink: any) => drink.id) || [];
    const uniqueIngredientsIds: string[] = uniqueIds(ingredientIds);
    const uniqueCotogorieIds: string[] = uniqueIds(categoryIds);
    const uniqueGlassesIds: string[] = uniqueIds(glassesIds);
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
    console.log(
      "TEST",
      transformCardData(mainData?.drinks!, "drink", storedFavorites)
    );

    return transformCardData(mainData?.drinks!, "drink", storedFavorites) || [];
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
          <Row
            style={{ fontSize: "25px", color: "#C62828", fontWeight: "bold" }}
          >
            {" "}
            VERI SAYI: {drinks?.length}
          </Row>
          <Row gutter={[16, 16]}>
            <CustomCard dataList={drinks} />
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};
