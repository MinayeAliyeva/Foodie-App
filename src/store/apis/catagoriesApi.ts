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
  reducerPath: "catagories",
  baseQuery: fetchBaseQuery({
    baseUrl: "https:/www.themealdb.com/api/json/v1/1/categories.php",
  }),
  endpoints: (builder) => ({
    fetchMeals: builder.query<MealsResponse, void>({
      query: () => ``,
    }),
  }),
});

export const { useFetchMealsQuery } = mealsApi;
export default mealsApi;
