import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IMealCategories,
  IMealDetail,
  IMealsIngredients,
  IRandomMeal,
  MealsResponse,
} from "../../modules";

const enum url {
  BASE_URL = "https://www.themealdb.com/api/json/v1/1/",
  SEARCH_URL = "search.php?",
  DETAIL_URL = "lookup.php?",
  CATOGORY_URL = "categories.php",
  AREA_URL = "list.php?",
  LIST_URL = "list.php?",
  FILTER_URL = "filter.php?",
  RANDOM_URL = "random.php",
}

const mealsApi = createApi({
  reducerPath: "meals",
  baseQuery: fetchBaseQuery({
    baseUrl: url?.BASE_URL,
  }),
  tagTypes: ["Meals"],
  endpoints: (builder) => ({
    getMeals: builder.query<MealsResponse, string | void>({
      query: (category = "") => ({
        url: url?.SEARCH_URL,
        params: {
          s: category,
        },
      }),
      keepUnusedDataFor: 600,
    }),
    getMealsByCategories: builder.query<IMealCategories, void>({
      query: () => url?.CATOGORY_URL,
    }),
    getMealDetail: builder.query<IMealDetail, string | void>({
      query: (detailId) => ({
        url: url?.DETAIL_URL,
        params: {
          i: detailId,
        },
      }),
    }),
    getMealsArea: builder.query<IMealDetail, string | void>({
      query: (a = "") => ({
        url: url?.AREA_URL,
        params: {
          a,
        },
      }),
    }),
    getMealsByArea: builder.query<IMealDetail, string | void>({
      query: (area) => ({
        url: url?.FILTER_URL,
        params: {
          a: area,
        },
      }),
    }),
    getIngredients: builder.query<IMealsIngredients, string | void>({
      query: (i = "") => ({
        url: url?.LIST_URL,
        params: {
          i,
        },
      }),
    }),
    getMealsByIngredients: builder.query<IMealsIngredients, string | void>({
      query: (ingredient) => ({
        url: url?.FILTER_URL,
        params: {
          i: ingredient,
        },
      }),
    }),
    getRandomMealQuery: builder.query<IRandomMeal, string | void>({
      query: () => ({
        url: url?.RANDOM_URL,
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetMealsQuery,
  useLazyGetMealsQuery,
  useGetMealsByCategoriesQuery,
  useLazyGetMealDetailQuery,
  useGetMealsAreaQuery,
  useLazyGetMealsByAreaQuery,
  useGetIngredientsQuery,
  useLazyGetMealsByIngredientsQuery,
  useLazyGetRandomMealQueryQuery,
} = mealsApi;

export default mealsApi;
