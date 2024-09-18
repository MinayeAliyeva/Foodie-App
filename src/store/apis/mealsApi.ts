import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMeal } from "../../shared/components/XCard";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
}

export interface MealsResponse {
  meals: Meal[];
}

export interface IMealCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface IMealCategories {
  categories: IMealCategory[];
}

export interface IMealDetail {
  meals: Meal[];
}
const enum url {
  BASE_URL = "https://www.themealdb.com/api/json/v1/1/",
  SEARCH_BY_URL = "search.php?",
  DETAIL_URL = "lookup.php?",
  CATOGORY_URL = "categories.php",
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
        url: url?.SEARCH_BY_URL,
        params: {
          s: category,
        },
      }),
      keepUnusedDataFor: 60,
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
      query: (list) => ({
        url: url?.LIST_URL,
        params: {
          a: list,
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
    getIngredients: builder.query<IMealDetail, string | void>({
      query: (i = "") => ({
        url: url?.LIST_URL,
        params: {
          i,
        },
      }),
    }),
    getMealsByIngredients: builder.query<any, string | void>({
      query: (ingredient) => ({
        url: url?.FILTER_URL,
        params: {
          i: ingredient,
        },
      }),
    }),
    getRandomMealQuery: builder.query<any, string | void>({
      query: () => ({
        url: url?.RANDOM_URL,
      }),
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
