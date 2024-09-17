import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Meal interface
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

// MealsResponse interface
export interface MealsResponse {
  meals: Meal[];
}

// Meal category interfaces
export interface IMealCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface IMealCategories {
  categories: IMealCategory[];
}

// Meal detail interface
export interface IMealDetail {
  meals: Meal[];
}

// Base API URL
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

// Define the API
const mealsApi = createApi({
  reducerPath: "meals",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Meals"],
  endpoints: (builder) => ({
    // Get meals by category or search term
    getMeals: builder.query<MealsResponse, string | void>({
      query: (category = "") => `search.php?s=${category}`,
      providesTags: (result) =>
        result?.meals
          ? [
              ...result.meals.map(({ idMeal }) => ({
                type: "Meals" as const,
                id: idMeal,
              })),
              { type: "Meals", id: "LIST" },
            ]
          : [{ type: "Meals", id: "LIST" }],
    }),

    // Get meal categories
    getMealsByCategories: builder.query<IMealCategories, void>({
      query: () => `categories.php`,
    }),

    // Get meal details by ID
    getMealDetail: builder.query<IMealDetail, string | void>({
      query: (detailId) => `lookup.php?i=${detailId}`,
    }),

    // Get meal areas (list of areas)
    getMealsArea: builder.query<IMealDetail, string | void>({
      query: (list) => `list.php?a=${list}`,
    }),

    // Get meals by area
    getMealsByArea: builder.query<IMealDetail, string | void>({
      query: (area) => `filter.php?a=${area}`,
    }),

    // Get ingredients list
    getIngredients: builder.query<IMealDetail, string | void>({
      query: () => `list.php?i`,
    }),
  }),
});

// Export hooks for the endpoints
export const {
  useGetMealsQuery,
  useLazyGetMealsQuery,
  useGetMealsByCategoriesQuery,
  useLazyGetMealDetailQuery,
  useGetMealsAreaQuery,
  useLazyGetMealsByAreaQuery,
  useGetIngredientsQuery,
} = mealsApi;

export default mealsApi;
