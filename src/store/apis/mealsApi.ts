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

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const SEARCH_BY_URL = "search.php?";

const mealsApi = createApi({
  reducerPath: "meals",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Meals"],
  endpoints: (builder) => ({
    getMeals: builder.query<MealsResponse, string | void>({
      query: (category = "") => ({
        url: SEARCH_BY_URL,
        params: {
          s: category,
        },
      }),
      keepUnusedDataFor: 60,
    }),

    getMealsByCategories: builder.query<IMealCategories, void>({
      query: () => `categories.php`,
    }),

    getMealDetail: builder.query<IMealDetail, string | void>({
      query: (detailId) => `lookup.php?i=${detailId}`,
    }),

    getMealsArea: builder.query<IMealDetail, string | void>({
      query: (list) => `list.php?a=${list}`,
    }),

    getMealsByArea: builder.query<IMealDetail, string | void>({
      query: (area) => `filter.php?a=${area}`,
    }),

    getIngredients: builder.query<IMealDetail, string | void>({
      query: () => `list.php?i`,
    }),
    getMealsByIngredients: builder.query<any, string | void>({
      query: (ingredient) => `filter.php?i=${ingredient}`,
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
} = mealsApi;

export default mealsApi;
