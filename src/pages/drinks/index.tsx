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
} from "../../store/apis/coctailApi";
import DrinkCard from "./DrinkCard";

export const Drinks = () => {
  const topics = ["First topic", "Second topic", "Third topic"];
  const [getCoctails, { data:mainData }] = useLazyGetCoctailsQuery();
  const [getCoctailByCatagory, { data: catagoryResponseData }] =
    useLazyGetCoctailByCatagoryQuery<any>();
  const [mealsAll, setMealsAll] = useState<any>({
    catagories: [],
    areas: [],
    ingredients: [],
  });
  console.log("mainData", mainData);

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
    area: string[];
    ingredient: string[];
  }>({
    category: [],
    area: [],
    ingredient: [],
  });

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
    }
  };
  console.log("state.catagory", state?.category);

  useEffect(() => {
    const fetchCatagoryData = async () => {
      try {
        const coctailCatagoryPromises = state.category.map((catagory: any) => {
          return getCoctailByCatagory(catagory, true);
        });

        const coctails = await Promise.all(coctailCatagoryPromises);
        console.log("coctails", coctails);

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

    fetchCatagoryData();
    if (!state.category?.length) {
      getCoctails();
      setMealsAll({
        catagories: [],
      });
    }
  }, [state, getCoctails, getCoctailByCatagory]);

  const drinks = useMemo(() => {
    if (state.category.length) {
      return mealsAll.catagories;
    } else {
      return mainData?.drinks;
    }
  }, [mealsAll, state.category.length, mainData?.drinks]);
  console.log("mealsAll", mealsAll);
  console.log("state", state);
  console.log("data", mainData);

  return (
    <>
      <NavBar menu={Menu} />
      <Layout>
        <XSideBar getCatagorieData={getSearchData} menu={Menu} />
        <Layout.Content className="content">
          <Row gutter={[16, 16]}>
            <DrinkCard drinks={drinks} />
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};
