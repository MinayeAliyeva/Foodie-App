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

const mealsApi = createApi({
  reducerPath: "meals",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1/",
  }),
  endpoints: (builder) => ({
    fetchMeals: builder.query<MealsResponse, void>({
      query: () => `search.php?s=`,
    }),
  }),
});

export const { useFetchMealsQuery } = mealsApi;
export default mealsApi;
