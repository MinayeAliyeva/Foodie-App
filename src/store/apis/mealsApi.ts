import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
export interface IMealCatagorie {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
export interface IMealCatagories {
  categories: IMealCatagorie[];
}
export interface IMealDetail {
  meals: Meal[];
}
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const mealsApi = createApi({
  reducerPath: "meals",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getMeals: builder.query<MealsResponse, string | void>({
      query: (catagorie = "") => `search.php?s=${catagorie}`,
    }),
    getMealsByCatagories: builder.query<IMealCatagories, void>({
      query: () => `categories.php`,
    }),
    getMealDeatail: builder.query<IMealDetail, string | void>({
      query: (detailId) => `lookup.php?i=${detailId}`,
    }),
    getMealsByArea: builder.query<IMealDetail, string | void>({
      query: (list) => `list.php?a=${list}`,
    }),
  }),
});

export const {
  useGetMealsQuery,
  useLazyGetMealsQuery,
  useGetMealsByCatagoriesQuery,
  useLazyGetMealDeatailQuery,
  useGetMealsByAreaQuery
} = mealsApi;

export default mealsApi;
